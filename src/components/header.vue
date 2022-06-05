<template>
  <header class="emo-header">
    <router-link :to="{ name: this.homeName }" class="emo-link"
      ><img src="@/assets/emocional-logo.png"
    /></router-link>
  </header>
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
};
</script>

<style lang="scss" scoped>
.emo {
  &-header {
    padding: 5px 10px;
    background: linear-gradient(to left, #9f70c1, #6773c7);
    background-size: 100% 3px;
    background-position: bottom 0 left 0, bottom 5px left 0;
    background-repeat: no-repeat;
    text-align: center;
  }
  &-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;

    img {
      max-width: 250px;
    }
  }
}
</style>
