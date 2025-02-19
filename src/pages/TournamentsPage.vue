<template>
  <div>
    <section
      class="text-uppercase text-center q-mt-lg text-h1 text-weight-thin"
    >
      <p>CREATORS</p>
      <p>HUB</p>
    </section>
    <section class="text-center q-mt-lg text-h6 text-weight-thin">
      <span>This community is awesome</span>
      <p>Proud of all of them</p>
    </section>
    <section class="row">
      <div class="col q-px-lg">
        <p class="text-weight-thin text-body1 q-pt-md">
          <span class="text-bold">1679</span> professionals waiting.
        </p>
      </div>
      <div class="col" align="right">
        <q-btn
          color="black"
          icon="add"
          class="q-mr-md q-mt-md"
          @click="openAddTournamentPage"
          v-if="userRole === humanResources"
        />
      </div>
    </section>
    <div v-if="tournaments.length && tournaments">
      <section
        v-for="(tournament, id) in tournaments"
        :key="id"
        class="q-ma-md"
      >
        <q-card class="my-card">
          <div class="row">
            <section class="col-2">
              <q-img
                src="https://cdn.quasar.dev/img/mountains.jpg"
                :ratio="16 / 12"
                spinner-color="primary"
                spinner-size="82px"
                class="full-height"
              />
            </section>
            <section class="col">
              <q-card-section class="row">
                <div class="text-capitalize col">
                  <p class="text-weight-thin text-body1">International</p>
                  <p class="text-h4">{{ tournament.description }}</p>
                  <p class="text-subtitle1">{{ tournament.categories }}</p>
                  <p class="">
                    From {{ tournament.startDate }} To {{ tournament.endDate }}
                  </p>
                </div>
                <div
                  class="col"
                  align="right"
                  v-if="userRole === humanResources"
                >
                  <q-btn flat icon="edit" @click="editTournament(tournament)" />
                  <q-btn
                    flat
                    icon="delete"
                    color="red-4"
                    @click="deleteTournament(tournament.id)"
                  />
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
        <EditTournamentsPage
          :openEditTournamentComponent="openEditTournamentComponent"
          @closeEditTournament="closeEditTournament"
          :tournamentID="Number(tournamentID)"
        />
      </section>
    </div>
    <div v-else class="text-center q-mt-md">
      <p class="text-h6 text-bold">There are no more tournaments...</p>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useApiStore } from "src/stores/api-store";
import EditTournamentsPage from "../components/Tournaments/EditTournamentsPage.vue";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";

// global variables
const { proxy } = getCurrentInstance();
const humanResources = proxy.$humanResources;
const serverURL = proxy.$serverURL;
const clientURL = proxy.$clientURL;
const $q = useQuasar();
const apiStore = useApiStore();

const tournaments = ref("");
const getTournaments = async () => {
  getMethod(
    serverURL,
    "tournament",
    tournaments,
    $q,
    "Ошибка при получении турниров"
  );
};

const userRole = ref("");
const defineUserRole = async () => {
  userRole.value = apiStore.userData.role;
};

onMounted(() => {
  getTournaments();
  defineUserRole();
});

// click button function
const openAddTournamentPage = () => {
  window.open(`${clientURL}hr/createTournament`, "blank");
};

const exploreTournaments = (item) => {
  console.log(item);
  window.open(`${clientURL}hr/${item.id}`, "_blank");
};

const openEditTournamentComponent = ref(false);
const tournamentID = ref("");
const editTournament = async (tournament) => {
  console.log(tournament.id);
  tournamentID.value = tournament.id;
  openEditTournamentComponent.value = true;
};

const closeEditTournament = () => {
  openEditTournamentComponent.value = false;
};

const deleteTournament = async (tournamentId) => {
  deleteMethod(serverURL, "tournament", tournamentId, "Успешно удален");
};
</script>

<style scoped>
.button {
  width: 150px;
  font-size: 18px;
}
</style>
