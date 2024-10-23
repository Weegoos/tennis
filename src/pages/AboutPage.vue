<template>
  <div class="q-pa-xl">
    <p class="text-h4 text-bold">О нас</p>
    <p class="text-body1">
      Мы команда Tennis.kz, на протяжении двух лет собирали и анализировали
      информацию о любительских турнирах. Мы посетили много стран в качестве
      участников, зрителей, партнёров и организаторов профессиональных и
      любительских турниров. Используя полученный опыт, мы постарались понять,
      что хочет получить игрок-любитель от участия в Турнире.
    </p>
    <p class="text-body1">Нами был получен следующий результат:</p>
    <ol
      class="text-body1"
      v-for="(item, index) in informationSection"
      :key="index"
    >
      <li>{{ item.name }}</li>
    </ol>
  </div>
</template>

<script setup>
import { ref } from "vue";

const informationSection = ref([
  {
    name: "Лёгкая, быстрая регистрация онлайн.",
  },
]);
</script>

<style></style>
