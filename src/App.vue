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
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Merienda&display=swap");
</style>
