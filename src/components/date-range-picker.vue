<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Picker without buttons"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
      :allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateRangePicker",
  prop: ["value"],
  data() {
    return {
      date: "",
      menu: false,
    };
  },
  watch: {
    date(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

<style></style>
