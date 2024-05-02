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
import {isDict, isString} from "@/functions.js";

export default {
  data() {
    return {
      authValue: '',
      fieldsError: {},
      alertError: null
    };
  },
  created() {
    // For safety + removes authValue if present
    this.$store.dispatch('logout');
  },
  methods: {
    async handleSubmit() {
      this.fieldsError = {};
      this.alertError = null;
      try {
        const formData = { authValue: this.authValue };
        const response = (await axios.post('http://localhost:8085/auth/login', formData));
        this.handleResponseData(response.data);
      }
      catch (error) {
        if (error.code === "ERR_NETWORK") {
          this.alertError = "Le formulaire a rencontré un problème de connexion. Veuillez réessayer plus tard.";
        } else if (!("response" in error)) {
          this.alertError = "Le formulaire envoyé n'a pas obtenu de réponse. Veuillez réessayer plus tard.";
        } else {
          this.handleResponseData(error.response.data);
        }
      }
    },
    handleResponseData(data) {
      if ("status" in data && "data" in data) {
        const status = data.status;
        const backendData = data.data;
        if (status === "success") {
          if ("key" in backendData) {
            const key = backendData.key;
            if (["REDIRECT_PASSWORD", "REDIRECT_REGISTER", "EMAIL_REQUIRED"].includes(key)) {
              if ("authValue" in backendData) {
                this.$store.dispatch('setAuthValue', backendData.authValue);

                if (key === "REDIRECT_PASSWORD") {
                  this.$router.push({ name: 'auth_password' });
                } else if (key === "REDIRECT_REGISTER") {
                  this.$router.push({ name: 'auth_register' });
                } else if (key === "EMAIL_REQUIRED") {
                  this.$router.push({ name: 'auth_email_required' });
                }
              } else {
                this.alertError = "Le formulaire a rencontré un problème. Veuillez réessayer.";
              }
            } else {
              this.alertError = "Le formulaire a rencontré un problème. Veuillez réessayer.";
            }
          } else {
            this.alertError = "Le formulaire a rencontré un problème. Veuillez réessayer.";
          }
        } else if (status === "error") {
          if (isString(backendData)) {
            this.alertError = backendData;
          } else if (isDict(backendData)) {
            this.fieldsError = backendData;
          } else {
            this.alertError = "Le formulaire a rencontré un problème. Veuillez réessayer.";
          }
        } else {
          this.alertError = "Le formulaire a rencontré un problème. Veuillez réessayer.";
        }
      } else {
        this.alertError = "Le formulaire a rencontré un problème. Veuillez réessayer.";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/addons/auth";
</style>
