<template>
  <div>
    <div class="">
      <p class="text-h4 text-bold">Новости</p>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey bg-transparent"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="all" label="Все" />
        <q-tab name="interview" label="Интервью" />
        <q-tab name="championship" label="Чемпиоанты" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="all">
          <div class="text-h6"></div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="interview">
          <div class="text-h6"></div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="championship">
          <div class="text-h6"></div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("all");
</script>

<style></style>
