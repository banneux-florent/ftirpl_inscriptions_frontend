<template>
  <div id="box">
    <img src="/img/logo.png" alt="Logo CPLiège" class="logo">
    <h3 class="mb-5">Aucune adresse e-mail n'est liée à ce numéro d'affiliation.</h3>
    <div id="auth-value" class="mb-5">
      <img src="/img/icons/profile.svg" alt="Icône compte">
      <p>{{ authValue }}</p>
    </div>
    <p class="mb-5">Afin d'accéder aux inscriptions en ligne de nos Championnats Provinciaux, <b>il est nécessaire que votre numéro d'affiliation soit lié à une adresse e-mail valide à laquelle vous ayez accès</b>. Cela nous permet de vérifier que vous êtes bien le/la propriétaire de ce numéro d'affiliation et ainsi empêcher l'usurpation d'identité.</p>
    <div id="inner" class="mb-5">
      <p class="mb-2">Pour palier à ce problème, veuillez entrer en contact avec notre Commission Provinciale. Vous trouvez les coordonnées de ses membres sur notre site à cette adresse: <a href="https://ftirpl.org/informations/commission" target="_blank">http://ftirpl.org/informations/commission</a>.</p>
      <p class="mb-0"><b>Une fois cette opération effectuée, vous pourrez avoir accès à nos inscriptions en ligne.</b></p>
    </div>
    <a id="bottom-link" @click="performLogout">Se déconnecter de ce compte</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authValue: null
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
