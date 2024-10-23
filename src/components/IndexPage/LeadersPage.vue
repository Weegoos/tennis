<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 250px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="batyr" label="Ашим Батыр" />
          <q-tab name="arystanbek" label="Абиев Арыстанбек" />
          <q-tab name="akzhan" label="Акжантай" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          v-for="(item, index) in userStats"
          :key="index"
        >
          <q-tab-panel :name="item.name">
            <p class="text-h4 text-bold">{{ item.userName }}</p>
            <p class="text-primary text-bold text-h6">Статистика</p>
            <q-list bordered separator>
              <q-item clickable v-ripple class="text-body1">
                <q-item-section> Общее количество очков </q-item-section>
                <q-item-section side> {{ item.points }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="text-body1">
                <q-item-section> Коэффициент успешности </q-item-section>
                <q-item-section side> {{ item.successRate }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="text-body1">
                <q-item-section> Турниры </q-item-section>
                <q-item-section side> {{ item.tournaments }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="text-body1">
                <q-item-section> Победы </q-item-section>
                <q-item-section side> {{ item.victories }}</q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
    <div class="col" align="center">
      <q-btn
        color="primary"
        class="text-body1 q-pa-sm"
        label="Показать всех"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("batyr");
const splitterModel = ref(20);

const userStats = ref([
  {
    name: "batyr",
    userName: "Ашим Батыр",
    points: 888,
    successRate: 50,
    tournaments: 20,
    victories: 10,
  },
  {
    name: "arystanbek",
    userName: "Арыстанбек Абиев",
    points: 250,
    successRate: 10,
    tournaments: 30,
    victories: 10,
  },
  {
    name: "akzhan",
    userName: "Акжакнтай",
    points: 550,
    successRate: 40,
    tournaments: 100,
    victories: 40,
  },
]);
</script>

<style></style>
