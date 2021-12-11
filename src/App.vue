<template>
  <div id="app">
    <label for="password">Password: </label>
    <input type="text" name="password" v-model="password" />
    <label for="username">Username of the public profile: </label>
    <input type="text" name="username" v-model="username" />
    <input type="submit" value="Submit" @click="submitData" />
    <br />
    <p>
      The emotion of the user is:<span>{{ emotion }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
      emotion: "",
    };
  },
  methods: {
    submitData() {
      this.emotion = "LOADING";
      fetch(
        `https://emotional-analysis-back.herokuapp.com/emotion?username=${this.username}&password=${this.password}`
      )
        .then((response) => response.json())
        .then((data) => (this.emotion = data.result));
    },
  },
};
</script>
