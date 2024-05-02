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
import axios, {isAxiosError} from "axios";
import {isDict, isString} from "@/functions.js";

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
      this.$this.$router.push({ name: 'auth_login' });
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
        const response = (await axios.post('http://localhost:8085/auth/password', formData));
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
            if (["TO_DO"].includes(key)) {
              // TODO: Continue
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
    },
    performLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'auth_login' });
      });
    }
  }
};

// florent-banneux@hotmail.com
</script>

<style lang="scss" scoped>
@import "@/assets/scss/addons/auth";
</style>
