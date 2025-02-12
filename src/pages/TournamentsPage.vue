<template>
  <div>
    <section class="col" align="right">
      <q-btn
        color="green-4"
        icon="add"
        class="q-mr-md q-mt-md"
        @click="onClick"
      />
    </section>
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
            <q-card-section class="row">
              <div class="text-h4 text-capitalize text-bold col">
                <p>{{ tournament.description }}</p>
                <p class="text-subtitle1">{{ tournament.categories[0] }}</p>
              </div>
              <div class="col" align="right" v-if="userRole === 'HR'">
                <q-btn flat icon="edit" @click="onClick" />
                <q-btn flat icon="delete" color="red-4" @click="onClick" />
              </div>
            </q-card-section>
            <q-card-section>
              <div>{{ tournament.location }}, {{ tournament.city }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                color="black"
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
import { getCurrentInstance, onMounted, ref } from "vue";
import { useApiStore } from "src/stores/api-store";

// global variables
const notifyStore = useNotifyStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();

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

const userRole = ref("");
const defineUserRole = async () => {
  userRole.value = apiStore.userData.role;
  console.log(userRole.value);
};

onMounted(() => {
  getTournaments();
  defineUserRole();
});

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
