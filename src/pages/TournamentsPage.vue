<template>
  <div>
    <section
      class="text-uppercase text-center q-mt-lg text-weight-thin"
      :class="$q.screen.width < mobileWidth ? 'text-h5' : 'text-h1'"
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
      <q-btn
        color="black"
        icon="add"
        class="q-mr-md q-mt-md"
        @click="openAddTournamentPage"
        v-if="userRole === humanResources"
        data-testid="openAddTournamentsButton"
      />
    </section>
    <div data-testid="tournamentsID" v-if="tournaments.data > []">
      <section
        v-for="(tournament, id) in tournaments.data"
        :key="id"
        class="q-ma-md"
        data-testid="tournamentContent"
      >
        <q-card class="my-card">
          <div class="" :class="$q.screen.width < mobileWidth ? 'col' : 'row'">
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
              <q-card-section
                :class="$q.screen.width < mobileWidth ? 'col' : 'row'"
              >
                <div class="text-capitalize col">
                  <p class="text-weight-thin text-body1">International</p>
                  <p class="text-h4">{{ tournament.description }}</p>
                  <p class="text-subtitle1">{{ tournament.category }}</p>
                  <p class="">
                    From {{ tournament.startDate }} To {{ tournament.endDate }}
                  </p>
                  <p>{{ tournament.location }}, {{ tournament.city }}</p>
                  <p class="text-bold">
                    {{ t("tournamentPage.mainPage.participants") }} : 10/{{
                      tournament.maxParticipants
                    }}
                  </p>
                </div>
                <div
                  class="col"
                  align="right"
                  data-testid="userRole"
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
              <q-card-actions align="right" data-testid="exploreTournaments">
                <q-btn
                  color="black"
                  class="q-pa-md button"
                  :label="t('tournamentPage.mainPage.exploreButton')"
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
    <div data-testid="noInfo" v-else class="text-center q-mt-md">
      <p class="text-h6 text-bold">There are no more tournaments...</p>
    </div>
    <q-pagination
      class="justify-center"
      v-model="current"
      :min="1"
      :max="maxPage"
      @update:model-value="pagination"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { useApiStore } from "src/stores/api-store";
import EditTournamentsPage from "../components/Tournaments/EditTournamentsPage.vue";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";
import { useI18n } from "vue-i18n";

// global variables
const { proxy } = getCurrentInstance();
const humanResources = proxy.$humanResources;
const serverURL = proxy.$serverURL;
const clientURL = proxy.$clientURL;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const mobileWidth = proxy.$mobileWidth;
const $q = useQuasar();
const apiStore = useApiStore();
const { t } = useI18n();

const tournaments = ref("");
const maxPage = ref("");
const getTournaments = async (page) => {
  getMethod(
    serverURL,
    `tournament/page?page=${page}&size=${maxNumberOfRequestPerPage}`,
    tournaments,
    $q,
    "Ошибка при получении турниров"
  );
};

watch(
  () => tournaments.value,
  (newVal) => {
    if (newVal && newVal.totalCount) {
      maxPage.value = Math.ceil(newVal.totalCount / maxNumberOfRequestPerPage);
    } else {
      maxPage.value = 1;
    }
  }
);
const userRole = ref("");
const defineUserRole = async () => {
  await apiStore.getUserProfile();
  userRole.value = apiStore.userData.role;
};

// click button function
const openAddTournamentPage = () => {
  window.open(`${clientURL}hr/createTournament`, "blank");
};

const current = ref(1);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  getTournaments(current.value);
};

onMounted(() => {
  getTournaments(current.value);
  defineUserRole();
});

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
