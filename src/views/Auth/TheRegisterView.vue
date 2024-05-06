<template>
  <div id="box">
    <img src="/img/logo.png" alt="Logo CPLiège" class="logo">
    <h3 class="mb-5">Inscription</h3>
    <p class="mb-5">Aucun mot de passe n'a encore été associé à ce compte. Veuillez choisir un mot de passe pour vos futures connexions au portail et inscriptions à nos championnats provinciaux.</p>
    <div id="auth-value" class="mb-5">
      <img src="/img/icons/profile.svg" alt="Icône compte">
      <p>{{ authValue }}</p>
    </div>
    <div v-if="alertError !== null" class="alert is-danger">{{ alertError }}</div>
    <form @submit.prevent="handleSubmit" class="mb-5">
      <div class="mb-4">
        <input
            type="password"
            v-model="password1"
            :class="{'is-invalid': 'password1' in fieldsError}"
            placeholder="Mot de passe"
        />
        <div v-if="'password1' in fieldsError" class="field-error">{{ fieldsError.password1 }}</div>
      </div>
      <div class="mb-4">
        <input
            type="password"
            v-model="password2"
            :class="{'is-invalid': 'password2' in fieldsError}"
            placeholder="Retapez votre mot de passe"
        />
        <div v-if="'password2' in fieldsError" class="field-error">{{ fieldsError.password2 }}</div>
      </div>
      <div class="mb-4">
        <input
            type="checkbox"
            v-model="acceptConditions"
            :checked="acceptConditions"
        />
        <label class="checkbox-label" for="<?= $field; ?>">
          En vous inscrivant, vous acceptez nos <router-link :to="{ name: 'gtc' }">Conditions Générales d'Utilisation</router-link> et notre <router-link :to="{ name: 'gdpr' }">Règlement Général sur la Protection des Données</router-link>.
        </label>
        <div v-if="'acceptConditions' in fieldsError" class="field-error">{{ fieldsError.acceptConditions }}</div>
      </div>
      <input type="submit" id="next" class="btn is-primary is-block" value="Valider" />
    </form>
    <a id="bottom-link" @click="performLogout">Changer de compte</a>
  </div>
</template>

<script>
import axios from "axios";
import {getElementFromKey, getIndexesFromKey, isNotEmptyArray} from "@/functions.js";
import {getText} from "@/texts.js";

export default {
  data() {
    return {
      authValue: null,
      password1: '',
      password2: '',
      acceptConditions: false,
      fieldsError: {},
      alertError: null
    };
  },
  created() {
    const authValue = this.$store.state.authValue;
    if (authValue === null) {
      this.$router.push({ name: 'auth_login' });
    } else {
      this.authValue = authValue;
    }
  },
  methods: {
    async handleSubmit() {
      this.fieldsError = {};
      this.alertError = null;
      try {
        const formData = {
          authValue: this.authValue,
          password1: this.password1,
          password2: this.password2,
          acceptConditions: this.acceptConditions
        };
        const response = (await axios.post("/auth/register", formData));
        this.handleResponseData(response.data);
      }
      catch (error) {
        if (error.code === "ERR_NETWORK") {
          this.alertError = getText("FORM_ERROR_TRY_AGAIN_LATER");
        } else if (!("response" in error)) {
          this.alertError = getText("FORM_NO_RESPONSE_TRY_AGAIN_LATER");
        } else {
          this.handleResponseData(error.response.data);
        }
      }
    },
    handleResponseData(data) {
      const indexes = getIndexesFromKey("FIELD_ERROR", data);
      if (isNotEmptyArray(indexes)) {
        for (let i = 0; i < indexes.length; i++) {
          const element = data[indexes[i]];
          if (element.field === "authValue") {
            this.$router.push({name: "auth_login"});
            // TODO: Display modal INVALID_SESSION ("Votre session s'est invalidée, veuillez vous reconnecter.")
          } else {
            this.fieldsError[element.field] = getText(element.message_key);
          }
        }
      } else {
        let element = getElementFromKey("ERROR_MESSAGE", data);
        if (element) {
          this.alertError = getText(element.message_key);
        } else {
          element = getElementFromKey("NEW_AUTH_DATA", data);
          if (element) {
            this.$store.dispatch('login', {
              accessToken: element.access_token,
              memberId: element.member_id
            });
            this.$router.push({ name: "index" });
          } else {
            this.alertError = getText("FORM_ERROR_TRY_AGAIN");
          }
        }
      }
    },
    performLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'auth_login' });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/addons/auth";
</style>
