<script setup>

</script>

<template>
  <div id="box">
    <p>Index</p>
    <p>Access: {{ access }}</p>
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
  }
};
</script>

<style scoped>

</style>