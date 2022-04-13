<template>
  <v-main>
    <UserInfo
      :username="username"
      :name="name"
      :profileImageUrl="profileImageUrl"
      :description="description"
    />
    <EmotionalTweetsTable
      :headers="['Fecha', 'Tweet', 'Emoción/es']"
      :emotionalTweets="analysis"
    />
  </v-main>
</template>

<script>
import UserInfo from "./../components/user-info.vue";
import EmotionalTweetsTable from "./../components/emotional-tweets-table.vue";
import axios from "axios";

export default {
  components: { UserInfo, EmotionalTweetsTable },
  data() {
    return {
      analysis: this.$store.getters.getAnalysis,
      username: this.$store.getters.getUsername,
      name: "",
      profileImageUrl: "",
      description: "",
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      axios
        .get("http://127.0.0.1:8000/userinfo?username=" + this.username)
        .then((result) => {
          this.name = result.data.name;
          this.profileImageUrl = result.data.profile_image_url;
          this.description = result.data.description;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
