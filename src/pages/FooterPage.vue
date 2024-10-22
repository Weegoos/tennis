<template>
  <div class="full-width text-white">
    <div class="row text-center" style="justify-content: center">
      <section
        class="text-center"
        v-for="(button, index) in footerButton"
        :key="index"
      >
        <q-btn flat :label="button.name" @click="pushToPage(button.link)" />
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
    <div
      class="q-gutter-md q-mt-md"
      :class="$q.screen.width > 800 ? 'row' : 'col'"
    >
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
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const footerButton = ref([
  {
    name: "Новости",
    link: "/news",
  },
  {
    name: "Контакты",
  },
  {
    name: "О нас",
    link: "/about",
  },
  {
    name: "Пользовательское соглашение",
  },
  {
    name: "Политика конфиденциальности",
  },
  {
    name: "Регламент турнира",
    link: "/regulations",
  },
]);

const router = useRouter();
const $q = useQuasar();
const pushToPage = (route) => {
  try {
    router.push(route);
  } catch (error) {
    throw new Error("Ссылки для этой кнопки не существует. FooterPage.vue");
  }
};
</script>

<style></style>
