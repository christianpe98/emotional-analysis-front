<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="dates"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="formattedDates"
        label="Seleccione un rango de fechas"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        color="#9ea2d9"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      scrollable
      range
      :show-current="false"
      min="2010-11-06"
      :max="new Date().toISOString().split('T')[0]"
      color="#9ea2d9"
    >
      <v-spacer></v-spacer>
      <v-btn text @click="modal = false" color="#9ea2d9"> Cancel </v-btn>
      <v-btn text @click="saveDates" color="#9ea2d9"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DateRangePicker",
  prop: ["value"],
  async created() {
    const now = new Date();
    now.setDate(now.getDate() - 7);
    const startDate = new Date(now.getTime()).toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];
    this.dates = [startDate, endDate];
    this.$emit("input", this.dates);
  },
  data() {
    return {
      dates: [],
      modal: false,
      isError: false,
      errorText: "",
    };
  },
  methods: {
    saveDates() {
      if (this.dates.length === 0) {
        this.isError = true;
        this.errorText =
          "Debes seleccionar una fecha iniciar y una fecha final";
        return;
      }
      this.$refs.dialog.save(this.dates);
      this.$emit("input", this.dates);
    },
  },
  computed: {
    formattedDates() {
      if (!this.dates || this.dates.length <= 0) return "";
      let formattedDates = [];
      for (let date of this.dates) {
        console.log(this.dates);
        const [year, month, day] = date.split("-");
        formattedDates.push(`${day}/${month}/${year}`);
      }
      return `Inicio: ${formattedDates[0]} - Fin: ${formattedDates[1]}`;
    },
  },
};
</script>

<style></style>
