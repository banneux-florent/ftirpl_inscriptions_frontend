<template>
  <div id="box">
    <img src="/img/logo.png" alt="Logo CPLiège" class="logo">
    <h3 class="mb-5">Connexion</h3>
    <p class="mb-5">Pour poursuivre votre authentification et accéder aux matchs, veuillez saisir votre mot de passe.</p>
    <div id="auth-value" class="mb-5">
      <img src="/img/icons/profile.svg" alt="Icône compte">
      <p>{{ authValue }}</p>
    </div>
    <div v-if="alertError !== null" class="alert is-danger">{{ alertError }}</div>
    <form @submit.prevent="handleSubmit" class="mb-5">
      <div class="mb-4">
        <input
            type="password"
            v-model="password"
            :class="{'is-invalid': 'password' in fieldsError}"
            placeholder="Mot de passe"
        />
        <div v-if="'password' in fieldsError" class="field-error">{{ fieldsError.password }}</div>
      </div>
      <input type="submit" id="next" class="btn is-primary is-block" value="Suivant" />
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
      password: '',
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
        const formData = { authValue: this.authValue, password: this.password };
        const response = (await axios.post("/auth/password", formData));
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
      // a1a2a3

      const indexes = getIndexesFromKey("FIELD_ERROR", data);
      if (isNotEmptyArray(indexes)) {
        for (let i = 0; i < indexes.length; i++) {
          const element = data[indexes[i]];
          if (element.field === "authValue") {
            this.$router.push({name: "auth_login"});
            // TODO: Display modal INVALID_SESSION ("Votre session est invalide, veuillez vous reconnecter.")
          } else {
            this.fieldsError[element.field] = getText(element.message_key);
          }
        }
      } else {
        let element = getElementFromKey("ERROR_MESSAGE", data);
        if (element) {
          this.alertError = getText(element.message_key);
        } else {
          element = getElementFromKey("NEW_AUTH_VALUES", data);
          if (element) {
            this.$store.dispatch('login', {
              token: element.token,
              userId: element.memberId
            });
            element = getElementFromKey("REDIRECT", data);
            if (element) {
              const routeName = element.route_name;
              if (this.$router.hasRoute(routeName))
                this.$router.push({ name: routeName });
            } else {
              this.alertError = getText("FORM_ERROR_TRY_AGAIN");
            }
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
