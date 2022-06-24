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
      await axios.get(process.env.VUE_APP_APPROACHES)
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
      methodAnalysis: "",
      isUsernameValid: false,
      isDatesValid: false,
      isMethodAnalysisValid: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.isUsernameValid && this.isDatesValid && this.isMethodAnalysisValid
      );
    },
  },
  watch: {
    username(newUsername) {
      if (newUsername === "") {
        this.isUsernameValid = false;
        return;
      }
      if (newUsername.includes("@")) {
        this.isError = true;
        this.errorText = "El nombre de usuario no debe de contener @";
        this.isUsernameValid = false;
        return;
      }
      this.isUsernameValid = true;
    },
    dates(newDates) {
      const startDate = new Date(newDates[0]);
      const endDate = new Date(newDates[1]);
      if (startDate > endDate) {
        this.isError = true;
        this.errorText = "La fecha de fin no puede ser anterior a la de inicio";
        this.isDatesValid = false;
        return;
      }
      if (newDates.length !== 2) {
        this.isError = true;
        this.errorText =
          "Debe indicarse una fecha de inicio y una fecha de fin";
        this.isDatesValid = false;
        return;
      }
      this.isDatesValid = true;
    },
    methodAnalysis(newMethod) {
      console.log(newMethod);
      if (newMethod === "") {
        this.isError = true;
        this.errorText = "Debe indicarse un método para realizar el análisis";
        this.isMethodAnalysisValid = false;
        return;
      }
      this.isMethodAnalysisValid = true;
    },
  },
  methods: {
    submitUsername() {
      this.$store.commit("setUsername", this.username);
      this.$store.commit("setDates", this.dates);
      this.isError = false;
      this.isLoading = true;
      axios
        .get(process.env.VUE_APP_EMOTIONAL, {
          params: {
            username: this.username,
            start_date: this.dates[0],
            end_date: this.dates[1],
            analysis_code: this.methodAnalysis,
          },
        })
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
