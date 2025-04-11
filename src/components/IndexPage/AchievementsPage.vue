<template>
  <p
    class="text-center text-bold"
    :class="$q.screen.width < mobileWidth ? 'text-h4' : 'text-h3'"
  >
    {{ t("indexPage.achievementsPage.achievementText") }}
  </p>
  <div style="background-color: #24293e" class="text-white q-pa-xl">
    <div
      class="q-gutter-xl text-center"
      :class="$q.screen.width < mobileWidth ? 'col ' : 'row'"
    >
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
import { getCurrentInstance, ref } from "vue";
import { useI18n } from "vue-i18n";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const { t } = useI18n();

const achievements = ref([
  {
    name: t("indexPage.achievementsPage.tournamentsHeld"),
    stats: 48,
  },
  {
    name: t("indexPage.achievementsPage.usedBalls"),
    stats: 1510,
  },
  {
    name: t("indexPage.achievementsPage.numberOfPlayers"),
    stats: 222,
  },
  {
    name: t("indexPage.achievementsPage.subscribers"),
    stats: 333,
  },
]);
</script>

<style></style>
