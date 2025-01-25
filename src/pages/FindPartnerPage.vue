<template>
  <div>
    <section class="card">
      <p class="text-h5 text-bold">Find a partner</p>
      <q-btn
        color="green-4"
        no-caps
        label="Place a request"
        @click="placeRequest"
      />
      <div class="filter row q-gutter-sm q-mt-sm">
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
    <q-card class="card" v-for="(items, index) in forms" :key="index">
      <div class="row">
        <div class="col">
          <q-avatar
            size="100px"
            font-size="52px"
            color="white"
            text-color="grey"
            icon="person"
            fab
          />
          <span class="text-body1">{{ items.name }}</span>
        </div>
        <span color="green-4" class="col q-ma-md" align="right"
          >NTRP {{ items.rating }}</span
        >
      </div>
      <q-card-section>
        <div class=""></div>
        <div class="text-subtitle">{{ items.description }}</div>
        <div class="text-subtitle">City: {{ items.city }}</div>
      </q-card-section>
    </q-card>
    <FindPartnerRequest
      :openRequestPage="openRequestPage"
      @closeFindPartnerRequestPage="closeFindPartnerRequestPage"
    />
  </div>
</template>

<script setup>
import FindPartnerRequest from "src/components/FindPartner/FindPartnerRequest.vue";
import { ref } from "vue";

const city = ref("Astana");
const from = ref("From");
const to = ref("To");
const cities = ["Astana", "Almaty", "Karaganda"];

const forms = ref([
  {
    name: "Batyr Ashim",
    rating: 2.5,
    city: "Astana",
    description:
      "An amateur tennis player who enjoys local tournaments and improving his serve.",
  },
  {
    name: "Aruzhan Kairat",
    rating: 3.5,
    city: "Almaty",
    description:
      "A tennis coach specializing in beginner and intermediate players.",
  },
  {
    name: "Murat Nurlan",
    rating: 4,
    city: "Shymkent",
    description:
      "A competitive tennis player known for his powerful backhand shots.",
  },
  {
    name: "Aliya Talgat",
    rating: 3.0,
    city: "Karaganda",
    description: "A recreational tennis enthusiast who loves doubles matches.",
  },
  {
    name: "Yerlan Zhanibek",
    rating: 3.0,
    city: "Aktobe",
    description:
      "A professional tennis player focusing on international competitions.",
  },
  {
    name: "Dana Beket",
    rating: 3.5,
    city: "Pavlodar",
    description:
      "An aspiring tennis player who trains daily to improve her forehand.",
  },
  {
    name: "Rustem Omar",
    rating: 4,
    city: "Atyrau",
    description:
      "A seasoned tennis player known for his strategic gameplay and endurance.",
  },
]);

const openRequestPage = ref(false);
const placeRequest = () => {
  openRequestPage.value = true;
};

const closeFindPartnerRequestPage = () => {
  openRequestPage.value = false;
};
</script>

<style scoped>
.card {
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
}
</style>
