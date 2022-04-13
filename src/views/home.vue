<template>
  <v-main class="df-flex justify-center align-center">
    <v-container>
      <v-alert
        dense
        text
        type="error"
        v-if="isError"
        dismissible
        v-model="isError"
        >{{ errorText }}</v-alert
      >

      <v-form ref="form" v-model="isValid" @submit.prevent="submitUsername">
        <v-row align="center">
          <UsernameInput v-model="username" @blur="cleanValidation" required />
          <v-btn color="primary" :disabled="!isValid" type="submit">
            Analizar
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import UsernameInput from "./../components/username-input.vue";
import { RouteName } from "./../router/router.const";
import { getErrorMessage, ERROR_SCOPES } from "./../utils/error_handler";

export default {
  name: "Home",
  components: { UsernameInput },
  data() {
    return {
      username: "",
      isError: false,
      errorText: "",
      lexicon: "",
      isValid: false,
    };
  },
  computed: {
    isFormValid() {
      if (this.username === "") return false;
      return true;
    },
  },
  methods: {
    submitUsername() {
      this.$store.commit("setUsername", this.username);
      axios
        .get("http://127.0.0.1:8000/emotional?username=" + this.username)
        .then((result) => {
          console.log(result.data);
          if (result.data.error) {
            this.isError = true;
            this.errorText = getErrorMessage(
              ERROR_SCOPES.HOME_SCOPE,
              result.data.error.code
            );
          } else {
            console.log(result);
            this.$store.commit("setAnalysis", result.data.result);
            this.$router.push(RouteName.ANALYSIS);
          }
        })
        .catch((error) => {
          const errorJson = error.toJSON();
          this.isError = true;
          this.errorText = getErrorMessage(
            ERROR_SCOPES.GENERAL_SCOPE,
            errorJson.status
          );
        });
    },
    cleanValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
