<template>
  <div>
    <section class="card">
      <p class="text-h5 text-bold">Find a partner</p>
      <div class="filter row q-gutter-sm">
        <div class="col">
          <q-select
            v-model="city"
            :options="cities"
            label="Choose a city"
            filled
          />
        </div>
        <div class="col">
          <div class="row q-gutter-sm">
            <section class="col">
              <q-select
                v-model="from"
                :options="ratingFrom"
                label="Rating"
                filled
              />
            </section>
            <section class="col">
              <q-select
                v-model="to"
                :options="ratingTo"
                label="Rating"
                filled
              />
            </section>
          </div>
        </div>
      </div>
    </section>
    <q-card class="card">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const city = ref("Astana");
const from = ref("From");
const to = ref("To");
const cities = ["Astana", "Almaty", "Karaganda"];
</script>

<style scoped>
.card {
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
