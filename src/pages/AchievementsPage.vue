<template>
  <div style="background-color: #24293e" class="text-white q-pa-xl">
    <p class="text-center text-h3 text-bold">Our achievements</p>
    <div class="row q-gutter-xl">
      <div
        class="col q-pa-md"
        v-for="(item, index) in achievements"
        :key="index"
        style="background-color: #1f2535"
      >
        <p class="text-bold text-h5">{{ item.stats }}</p>
        <p class="text-body1">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const achievements = ref([
  {
    name: "Tournaments held",
    stats: 48,
  },
  {
    name: "Used balls",
    stats: 1510,
  },
  {
    name: "Number of players",
    stats: 222,
  },
  {
    name: "Subscribers",
    stats: 333,
  },
]);
</script>

<style></style>
