<template>
  <v-app-bar app color="primary" dark class="d-flex justify-center">
    <v-btn text @click="toHomePage"> emotional analyzer </v-btn>
  </v-app-bar>
</template>

<script>
import { RouteName } from "./../router/router.const";

export default {
  name: "Header",
  data() {
    return {
      homeName: RouteName.HOME.name,
    };
  },
  methods: {
    toHomePage() {
      this.$router.push({ name: RouteName.HOME.name }).catch(() => {});
    },
  },
};
</script>
