<script setup>

</script>

<template>
  <div id="box">
    <p>Index</p>
    <p>Access: {{ access }}</p>
    <div class="btn is-danger mt-5" @click="performLogout">Déconnexion</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TheIndexView",
  data() {
    return {
      access: null
    }
  },
  async created() {
    try {
      await axios.get("/competitions");
    }
    catch (error) {
      console.log(error);
    }

    const auth = JSON.parse(localStorage.getItem('auth'));
    this.access = auth.accessToken;
  },
  methods: {
    performLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'auth_login' });
      });
    }
  }
};
</script>

<style scoped>

</style>