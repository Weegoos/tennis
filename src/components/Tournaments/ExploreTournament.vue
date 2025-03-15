<template>
  <div>
    <p class="text-weight-regular text-h1 text-center q-mt-xl text-bold">
      {{ tournament.description }}
    </p>
    <p class="text-weight-thin text-h5 text-center q-mt-xl text-bold">
      {{ tournament.location }} - {{ tournament.city }}
    </p>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Additional informations"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :separator="separator"
        hide-bottom
      />
    </div>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Participant(s)"
        :rows="participantsRows"
        :columns="participantsColumns"
        row-key="participant"
        :separator="separator"
        hide-bottom
      />
    </div>
    <div class="q-pa-md">
      <q-btn
        color="green-4"
        no-caps
        label="Register to the tournament"
        :disable="isRelatedUserToTournament"
        @click="registerToTournament"
      >
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          v-if="isRelatedUserToTournament"
        >
          {{ messageToUser }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { getMethod } from "src/composables/apiMethod/get";
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";

// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const apiStore = useApiStore();

const registerToTournament = async () => {
  const url = window.location.hash;
  const match = url.match(/\/hr\/(\d+)/);
  const id = Number(match[1]);
  console.log(id);

  await apiStore.getUserProfile();

  const tournamentRegistration = {
    tournamentId: Number(id),
    userId: apiStore.userData.id,
    partnerId: undefined,
  };
  await postMethod(serverURL, "registration", tournamentRegistration, $q);
};

const columns = [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "startTime",
    label: "Start Time",
    align: "left",
    field: "startTime",
    sortable: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    align: "left",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    label: "End Date",
    align: "left",
    field: "endDate",
    sortable: true,
  },
  {
    name: "minLevel",
    label: "Minimum level",
    align: "left",
    field: "minLevel",
    sortable: true,
  },
  {
    name: "maxLevel",
    label: "Maximum level",
    align: "left",
    field: "maxLevel",
    sortable: true,
  },
  {
    name: "maxParticipants",
    label: "Maximum participants",
    align: "left",
    field: "maxParticipants",
    sortable: true,
  },
  {
    name: "cost",
    label: "Cost (тг)",
    align: "left",
    field: `cost`,
    sortable: true,
  },
  {
    name: "category",
    label: "Category",
    align: "left",
    field: `category`,
    sortable: true,
  },
];

const rows = ref([]);

const defineId = () => {
  const url = window.location.hash;
  const match = url.match(/\/hr\/(\d+)/);

  if (match) {
    const id = match[1];
    console.log(id);
    getTournamentsByID(id);
    getInformationAboutPaarticipants(id);
  } else {
    console.log("Не найден id");
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

const participantsColumns = [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: (user) => user.userInfo.firstName,
    sortable: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    align: "left",
    field: (user) => user.userInfo.lastName,
    sortable: true,
  },
  {
    name: "phone",
    label: "Phone",
    align: "left",
    field: (user) => user.userInfo.phone,
    sortable: true,
  },
  {
    name: "gender",
    label: "Gender",
    align: "left",
    field: (user) => user.userInfo.gender,
    sortable: true,
  },
  {
    name: "createdAt",
    label: "Created At",
    align: "left",
    field: "createdAt",
    sortable: true,
  },
];
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

  console.log("API Response:", participants.value); // Посмотреть, что реально приходит

  const cleanParticipants =
    Array.isArray(participants.value) && Array.isArray(participants.value[0])
      ? participants.value[0]
      : Array.isArray(participants.value)
      ? participants.value
      : [];

  participantsRows.value = Array.isArray(participants.value)
    ? participants.value.flat()
    : [];

  console.log("Processed participantsRows:", participantsRows.value);
};

const isRelatedUserToTournament = ref(false);
const messageToUser = ref("");
const checkTheUserInfoAndTournamentInfo = async (tournamentInfo) => {
  console.log(tournamentInfo);
  await apiStore.getUserProfile();
  console.log(apiStore.userData.userInfo.rating);
  if (tournamentInfo.category === apiStore.userData.userInfo.gender) {
    isRelatedUserToTournament.value = true;
    messageToUser.value =
      "Your gender and the required gender in the tournament do not match";
  }

  if (
    tournamentInfo.minLevel > apiStore.userData.userInfo.rating ||
    tournamentInfo.maxLevel < apiStore.userData.userInfo.rating
  ) {
    isRelatedUserToTournament.value = true;
    messageToUser.value =
      "Your level does not match the required level in the tournament";
  }
};

onMounted(() => {
  defineId();
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

.tournament-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
