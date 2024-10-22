<template>
  <div class="full-width text-white q-pa-md">
    <div class="row text-center">
      <section
        class="text-center"
        v-for="(button, index) in footerButton"
        :key="index"
      >
        <q-btn flat :label="button.name" @click="onClick" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const footerButton = ref([
  {
    name: "Новости",
  },
  {
    name: "Новости",
  },
]);
</script>

<style></style>
