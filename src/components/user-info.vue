<template>
  <v-card class="my-12">
    <v-container>
      <v-row>
        <v-col style="text-align: right">
          <v-avatar size="150">
            <v-img :src="profileImageUrl"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-card-title>{{ name }}</v-card-title>
          <v-card-subtitle>
            <a :href="'https://twitter.com/' + username" target="_blank"
              >@{{ username }}</a
            ></v-card-subtitle
          >
          <v-card-text>{{ description }}</v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    username: String,
    name: String,
    profileImageUrl: String,
    description: String,
  },
};
</script>

<style></style>
