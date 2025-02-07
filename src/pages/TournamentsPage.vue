<template>
  <div>
    <section v-for="(tournament, id) in tournaments" :key="id" class="q-ma-md">
      <q-card class="my-card">
        <div class="row">
          <section class="col-2">
            <q-img
              src="https://cdn.quasar.dev/img/mountains.jpg"
              :ratio="16 / 12"
              spinner-color="primary"
              spinner-size="82px"
            />
          </section>
          <section class="col">
            <q-card-section>
              <div class="text-h4 text-capitalize text-bold">
                {{ tournament.description }}
              </div>
              <div class="text-subtitle1">{{ tournament.categories[0] }}</div>
            </q-card-section>
            <q-card-section>
              <div>{{ tournament.location }}, {{ tournament.city }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                color="green-4"
                class="q-pa-md button"
                label="Explore"
                @click="exploreTournaments(tournament)"
              />
            </q-card-actions>
          </section>
        </div>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, ref } from "vue";

// global variables
const notifyStore = useNotifyStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const tournaments = ref("");
const getTournaments = async () => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverURL}tournament`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      withCredentials: true,
    });

    console.log(response.data);
    const allTournaments = response.data.map((tournaments) => tournaments);
    tournaments.value = allTournaments;
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
  }
};

getTournaments();

const exploreTournaments = (item) => {
  console.log(item);
};
</script>

<style scoped>
.button {
  width: 150px;
  font-size: 18px;
}
</style>
