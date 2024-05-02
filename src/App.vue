<script setup>
import { RouterView } from 'vue-router'
import TableCenterLayout from "@/layouts/TableCenterLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>

<template>
  <template v-if="$route.meta.layout === 'table-center'">
    <table-center-layout>
      <router-view />
    </table-center-layout>
  </template>
  <template v-else>
    <default-layout>
      <router-view />
    </default-layout>
  </template>
</template>
