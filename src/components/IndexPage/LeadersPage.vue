<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 250px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="mails" label="Ашим Батыр" />
          <q-tab name="alarms" label="Абиев Арыстанбек" />
          <q-tab name="movies" label="Акжантай" />
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
            <q-list bordered>
              <q-item clickable v-ripple class="text-body1">
                <q-item-section> Общее количество очков </q-item-section>
                <q-item-section side> {{ item.points }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="text-body1">
                <q-item-section> Коэффициент успешности </q-item-section>
                <q-item-section side> {{ item.successRate }}</q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("mails");
const splitterModel = ref(20);

const userStats = ref([
  {
    name: "mails",
    userName: "Ашим Батыр",
    points: 888,
    successRate: 50,
  },
]);
</script>

<style></style>
