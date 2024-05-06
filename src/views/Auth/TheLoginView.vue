<template>
  <div id="box">
    <img src="/img/logo.png" alt="Logo CPLiège" class="logo">
    <h3 class="mb-5">Connexion</h3>
    <p class="mb-5">Bienvenue sur le portail d'inscription aux <b>Championnats Provinciaux</b> de la <b>Province de Liège</b>. Avant de poursuivre, veuillez vous authentifier.</p>
    <div v-if="alertError !== null" class="alert is-danger">{{ alertError }}</div>
    <form @submit.prevent="handleSubmit" class="mb-1-5">
      <div class="mb-4">
        <input
            type="text"
            v-model="authValue"
            :class="{'is-invalid': 'authValue' in fieldsError}"
            placeholder="Adresse e-mail / Numéro d'affiliation"
        />
        <div v-if="'authValue' in fieldsError" class="field-error">{{ fieldsError.authValue }}</div>
      </div>
      <input type="submit" id="next" class="btn is-primary is-block" value="Suivant" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {getElementFromKey, getIndexesFromKey, isNotEmptyArray} from "@/functions.js";
import {getText} from "@/texts.js";

export default {
  data() {
    return {
      authValue: '',
      fieldsError: {},
      alertError: null
    };
  },
  created() {
    if (this.$store.state.isAuthenticated)
      this.$store.dispatch('logout'); // For safety
    this.$store.dispatch('setAuthValue', null);
  },
  methods: {
    async handleSubmit() {
      this.fieldsError = {};
      this.alertError = null;
      try {
        const formData = { authValue: this.authValue };
        const response = (await axios.post("/auth/login", formData));
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
      // florent-banneux@hotmail.com

      const indexes = getIndexesFromKey("FIELD_ERROR", data);
      if (isNotEmptyArray(indexes)) {
        for (let i = 0; i < indexes.length; i++) {
          const element = data[indexes[i]];
          this.fieldsError[element.field] = getText(element.message_key);
        }
      } else {
        let element = getElementFromKey("ERROR_MESSAGE", data);
        if (element) {
          this.alertError = getText(element.message_key);
        } else {
          element = getElementFromKey("NEW_AUTH_VALUE", data);
          if (element) {
            this.$store.dispatch('setAuthValue', element.value);
            element = getElementFromKey("REGISTRATION_STATE", data);
            if (element) {
              const state = element.state;
              switch (state) {
                case "HAS_PASSWORD":
                  this.$router.push({ name: "auth_password" });
                  break;
                case "NO_PASSWORD":
                  this.$router.push({ name: "auth_register" });
                  break;
                case "NO_EMAIL":
                  this.$router.push({ name: "auth_email_required" });
                  break;
              }
            } else {
              this.alertError = getText("FORM_ERROR_TRY_AGAIN");
            }
          } else {
            this.alertError = getText("FORM_ERROR_TRY_AGAIN");
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/addons/auth";
</style>
