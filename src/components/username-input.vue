<template>
  <v-text-field
    v-model="username"
    hint="Introduce el nombre de usuario de un perfil público de Twitter"
    label="Nombre de usuario"
    placeholder="Twitter"
    prepend-icon="mdi-twitter"
    :rules="[validationRules.notEmpty, validationRules.withoutAt]"
    @blur="$emit('blur')"
    color="#7bc8df"
  ></v-text-field>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      username: this.value,
      validationRules: {
        notEmpty: (username) =>
          !!username || "El nombre de usuario no puede estar vacío",
        withoutAt: (username) => {
          const pattern = /@\w*/;
          return (
            !pattern.test(username) || "Introduce el nombre de usuario sin el @"
          );
        },
      },
    };
  },
  watch: {
    username(newValue) {
      this.$emit("input", newValue);
    },
  },
  emits: ["blur", "input"],
};
</script>

<style></style>
