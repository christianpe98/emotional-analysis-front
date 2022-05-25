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

      <Loading v-if="isLoading" />
      <v-form
        v-else
        ref="form"
        v-model="isValid"
        @submit.prevent="submitUsername"
      >
        <UsernameInput v-model="username" @blur="cleanValidation" required />
        <DateRangePicker v-model="dates" />
        <v-combobox
          v-model="selected"
          :items="items"
          label="Combobox"
          item-text="label"
          dense
        ></v-combobox>
        <v-btn color="primary" :disabled="!isFormValid" type="submit">
          Analizar
        </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import { RouteName } from "./../router/router.const";
import { getErrorMessage, ERROR_SCOPES } from "./../utils/error_handler";
import UsernameInput from "./../components/username-input.vue";
import DateRangePicker from "../components/date-range-picker.vue";
import Loading from "../components/loading.vue";

export default {
  name: "Home",
  components: { UsernameInput, DateRangePicker, Loading },
  async created() {
    this.items = (
      await axios.get("http://127.0.0.1:8000/emotional/approaches")
    ).data.approaches_codes;
  },
  data() {
    return {
      username: "",
      dates: [],
      isError: false,
      errorText: "",
      lexicon: "",
      isValid: false,
      isLoading: false,
      items: [],
      selected: "",
    };
  },
  computed: {
    isFormValid() {
      if (this.username === "") return false;
      console.log(this.dates.length);
      if (this.dates.length !== 2) return false;
      return true;
    },
  },
  methods: {
    submitUsername() {
      const startDate = new Date(this.dates[0]);
      const endDate = new Date(this.dates[1]);
      if (startDate > endDate) {
        this.isError = true;
        this.errorText = "La fecha inicial es posterior a la de fin";
        return;
      }
      this.$store.commit("setUsername", this.username);
      this.$store.commit("setDates", this.dates);
      this.isError = false;
      this.isLoading = true;
      axios
        .get(
          "http://127.0.0.1:8000/emotional?username=" +
            this.username +
            "&start_date=" +
            this.dates[0] +
            "&end_date=" +
            this.dates[1] +
            "&spproach=" +
            this.selected.code
        )
        .then((result) => {
          if (result.data.error) {
            this.isLoading = false;
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
          this.isLoading = false;
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
