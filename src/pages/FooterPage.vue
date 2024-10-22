<template>
  <div class="full-width text-white">
    <div class="row text-center" style="justify-content: center">
      <section
        class="text-center"
        v-for="(button, index) in footerButton"
        :key="index"
      >
        <q-btn flat :label="button.name" @click="onClick" />
      </section>
    </div>
    <div class="q-mt-lg">
      <q-separator
        spaced
        inset
        style="background-color: aliceblue"
        dark
        class="q-mt-md"
      />
    </div>
    <div class="row q-gutter-md q-mt-md">
      <div class="col" style="margin-top: 35px" align="center">
        <p class="text-body1 text-grey-8">
          Copyright (c) 2023 AMATURE TOURNAMENT
        </p>
      </div>
      <div class="col" align="center">
        <q-btn icon="telegram" flat round size="25px" @click="onClick" />
      </div>
      <div
        class="col text-body1 text-grey-8"
        align="center"
        style="margin-top: 35px"
      >
        ООО «AMATURE TOURNAMENT»
      </div>
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
    name: "Контакты",
  },
  {
    name: "О нас",
  },
  {
    name: "Пользовательское соглашение",
  },
  {
    name: "Политика конфиденциальности",
  },
  {
    name: "Регламент турнира",
  },
]);
</script>

<style></style>
