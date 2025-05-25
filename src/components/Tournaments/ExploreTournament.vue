<template>
  <div>
    <p
      :class="$q.screen.width < mobileWidth ? 'text-h4' : 'text-h1 '"
      class="text-weight-regular text-center q-mt-xl text-bold"
    >
      {{ tournament.description }}
    </p>
    <p
      :class="$q.screen.width < mobileWidth ? 'text-h6' : 'text-h5'"
      class="text-weight-thin text-center q-mt-xl text-bold"
    >
      {{ tournament.location }} - {{ tournament.city }}
    </p>
    <div class="q-pa-md">
      <q-table
        flat
        class="cursor-pointer"
        bordered
        :title="t('tournamentPage.exploreTournament.additionalInformation')"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-bottom
      />
    </div>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        class="cursor-pointer"
        :title="t('tournamentPage.exploreTournament.participants')"
        :rows="participantsRows"
        :columns="participantsColumns"
        @row-click="viewDetailedInformationAboutParticipant"
        row-key="participant"
      />
    </div>
    <div>
      <BracketsPage :tournamentID="String(tournamentID)" />
    </div>
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        color="green-4"
        no-caps
        :label="t('tournamentPage.exploreTournament.registerToTheTournament')"
        :disable="!isRelatedUserToTournament"
        @click="registerToTournament"
      >
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          v-if="isRelatedUserToTournament == false"
        >
          {{ messageToUser }}
        </q-tooltip>
      </q-btn>

      <BasePostButton
        v-if="userRole === humanResources"
        label="Generate bracket"
        @click="generateBracket"
      />

      <q-btn
        color="primary"
        no-caps
        rounded
        :label="t('tournamentPage.exploreTournament.searchPartner')"
        v-if="isRelatedUserToTournament && isRelatedUserFormat"
        @click="openSearchComponent"
      >
      </q-btn>
    </div>
    <SearchPartnerPage
      :isOpenSearchComponent="Boolean(isOpenSearchComponent)"
      @closeSearchPartnerComponent="closeSearchPartnerComponent"
    />
    <DetailedInformationAboutParticipant
      :openWindowAboutParticipant="openWindowAboutParticipant"
      :detailedInformation="Object(detailedInformation)"
      @closeDetailedInformationWindow="closeDetailedInformationWindow"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getMethod } from "src/composables/apiMethod/get";
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";
import SearchPartnerPage from "./SearchPartnerPage.vue";
import { useI18n } from "vue-i18n";
import BracketsPage from "./BracketsPage.vue";
import DetailedInformationAboutParticipant from "./DetailedInformationAboutParticipant.vue";
import BasePostButton from "../atoms/BasePostButton.vue";
// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const adminURL = proxy.$adminURL;
const apiStore = useApiStore();
const mobileWidth = proxy.$mobileWidth;
const humanResources = proxy.$humanResources;
const { t } = useI18n();

const registerToTournament = async () => {
  const url = window.location.hash;
  const match = url.match(/\/hr\/(\d+)/);
  const id = Number(match[1]);
  await apiStore.getUserProfile();

  const tournamentRegistration = {
    tournamentId: Number(id),
    userId: apiStore.userData.id,
    partnerId: undefined,
  };
  await postMethod(serverURL, "registration", tournamentRegistration, $q);
};

const userRole = ref(null);
const defineUserRole = async () => {
  try {
    await apiStore.getUserProfile();
    userRole.value = apiStore.userData.role;
  } catch (error) {
    console.error(error);
  }
};

const generateBracket = async () => {
  const url = window.location.hash;
  const match = url.match(/\/hr\/(\d+)/);
  const id = Number(match[1]);
  console.log(id);

  try {
    await postMethod(
      adminURL,
      `tournaments/${id}/generate-bracket`,
      "",
      $q,
      "The tournament grid has been created"
    );
  } catch (error) {
    console.error(error);
  }
};

const columns = computed(() => [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "startTime",
    label: t("tournamentPage.editPage.startTimeText"),
    align: "left",
    field: "startTime",
    sortable: true,
  },
  {
    name: "startDate",
    label: t("tournamentPage.editPage.startDateText"),
    align: "left",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    label: t("tournamentPage.editPage.endDateText"),
    align: "left",
    field: "endDate",
    sortable: true,
  },
  {
    name: "minLevel",
    label: t("tournamentPage.editPage.minLevelText"),
    align: "left",
    field: "minLevel",
    sortable: true,
  },
  {
    name: "maxLevel",
    label: t("tournamentPage.editPage.maxLevelText"),
    align: "left",
    field: "maxLevel",
    sortable: true,
  },
  {
    name: "maxParticipants",
    label: t("tournamentPage.editPage.maxParticipantsText"),
    align: "left",
    field: "maxParticipants",
    sortable: true,
  },
  {
    name: "cost",
    label: t("costText"),
    align: "left",
    field: `cost`,
    sortable: true,
  },
  {
    name: "category",
    label: t("tournamentPage.editPage.categoryText"),
    align: "left",
    field: `category`,
    sortable: true,
  },
]);

const rows = ref([]);
const tournamentID = ref("");
const defineId = () => {
  const url = window.location.hash;
  const match = url.match(/\/hr\/(\d+)/);

  if (match) {
    const id = match[1];
    tournamentID.value = id;
    getTournamentsByID(id);
    getInformationAboutPaarticipants(id);
  } else {
    console.error("Не найден id");
  }
};

const tournament = ref("");
const getTournamentsByID = async (id) => {
  await getMethod(
    serverURL,
    `tournament/${id}`,
    tournament,
    $q,
    "Ошибка при получении турнира"
  );
  checkTheUserInfoAndTournamentInfo(tournament.value);
  rows.value =
    tournament.value && typeof tournament.value === "object"
      ? [
          {
            id: tournament.value.id,
            startTime: tournament.value.startTime,
            description: tournament.value.description,
            location: tournament.value.location,
            city: tournament.value.city,
            startDate: tournament.value.startDate,
            endDate: tournament.value.endDate,
            minLevel: tournament.value.minLevel,
            maxLevel: tournament.value.maxLevel,
            maxParticipants: tournament.value.maxParticipants,
            cost: tournament.value.cost,
            category: tournament.value.category,
          },
        ]
      : [];
};

const participantsColumns = computed(() => [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "participantName",
    label: "Participant Name",
    align: "left",
    field: (user) => user.participantName,
    sortable: true,
  },
]);
const participants = ref([]);
const participantsRows = ref([]);
const getInformationAboutPaarticipants = async (id) => {
  await getMethod(
    serverURL,
    `tournament/${id}/participants`,
    participants,
    $q,
    "Ошибка при получении информации о участниках"
  );

  const cleanParticipants =
    Array.isArray(participants.value) && Array.isArray(participants.value[0])
      ? participants.value[0]
      : Array.isArray(participants.value)
      ? participants.value
      : [];

  participantsRows.value = Array.isArray(participants.value)
    ? participants.value.flat()
    : [];
};

// detailed information about participant
const detailedInformation = ref([]);
const openWindowAboutParticipant = ref(false);
const viewDetailedInformationAboutParticipant = async (info, row) => {
  openWindowAboutParticipant.value = true;
  detailedInformation.value = row;
  console.log(row.primaryPlayer.id);
};

const closeDetailedInformationWindow = () => {
  openWindowAboutParticipant.value = false;
};

const isRelatedUserToTournament = ref(false);
const isRelatedUserFormat = ref(false);
const messageToUser = ref("");
const checkTheUserInfoAndTournamentInfo = async (tournamentInfo) => {
  await apiStore.getUserProfile();

  if (
    tournamentInfo.minLevel > apiStore.userData.userInfo.rating ||
    tournamentInfo.maxLevel < apiStore.userData.userInfo.rating
  ) {
    isRelatedUserToTournament.value = false;
    messageToUser.value = t(
      "tournamentPage.exploreTournament.levelDoesNotMatch"
    );
  } else {
    isRelatedUserToTournament.value = true;
  }

  if (tournamentInfo.category.includes("DOUBLE")) {
    isRelatedUserFormat.value = true;
  } else {
    isRelatedUserFormat.value = false;
  }
};

// search
const isOpenSearchComponent = ref(false);
const openSearchComponent = () => {
  isOpenSearchComponent.value = true;
};

const closeSearchPartnerComponent = () => {
  isOpenSearchComponent.value = false;
};

onMounted(() => {
  defineId();
  defineUserRole();
});
</script>

<style scoped>
.tournament-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  position: relative;
}

.match {
  text-align: center;
}
</style>
