<template>
  <v-simple-table fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header" class="text-center">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="et in emotionalTweets" :key="et.tweet_id">
          <td class="text-center">
            {{ formatDate(et.date) }}
          </td>
          <td class="text-center">{{ et.text }}</td>
          <td class="text-center">{{ et.emotions.join(", ") }}</td>
        </tr>
        <tr v-if="!emotionalTweets.length">
          <td class="text-center" colspan="3">
            <i>El usuario no tiene tweets</i>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import moment from "moment";

export default {
  name: "EmotionalTweetsTable",
  props: ["headers", "emotionalTweets"],
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/yyyy");
    },
  },
};
</script>

<style></style>
