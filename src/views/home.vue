<template>
  <main class="emo-main">
    <div class="emo-title-wrapper">
      <h1>Análisis emocional</h1>
    </div>
    <div class="emo-wrapper">
      <v-alert
        dense
        color="#e066a2"
        text
        type="error"
        v-if="isError"
        dismissible
        v-model="isError"
        >{{ errorText }}</v-alert
      >

      <Loading v-if="isLoading" />
      <v-form
        class="emo-form"
        v-else
        ref="form"
        v-model="isValid"
        @submit.prevent="submitUsername"
      >
        <UsernameInput v-model="username" @blur="cleanValidation" required />
        <DateRangePicker v-model="dates" />
        <div class="emo-combobox-wrapper">
          <v-autocomplete
            v-model="methodAnalysis"
            :items="items"
            label="Seleccione un método para realizar el análisis"
            item-text="label"
            item-value="code"
            dense
            color="#e066a2"
            no-data-text="Ninguna coincidencia con los métodos disponibles"
          ></v-autocomplete>
        </div>
        <v-btn color="#7bc8df" :disabled="!isFormValid" type="submit">
          Analizar
        </v-btn>
      </v-form>
    </div>
  </main>
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
      methodAnalysis: null,
    };
  },
  computed: {
    isFormValid() {
      if (this.username === "") return false;
      if (this.dates.length !== 2) return false;
      if (!this.methodAnalysis) return false;
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
            "&analysis_code=" +
            this.methodAnalysis
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

<style lang="scss" scoped>
.emo {
  &-main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &-title-wrapper {
    width: 100%;
    max-width: 900px;
    padding-left: 50px;
    h1 {
      color: #faa250;
    }
  }
  &-wrapper {
    width: 100%;
    max-width: 900px;
    border: 4px solid #faa250;
    border-radius: 50px;
    padding: 50px;
  }
  &-form {
    text-align: right;
    width: 100%;
  }

  &-combobox-wrapper {
    padding-left: 33px;
  }
}
</style>
