<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "./components/header.vue";
export default {
  name: "App",
  components: { Header },
};
</script>
