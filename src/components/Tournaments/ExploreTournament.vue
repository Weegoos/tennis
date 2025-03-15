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
        title="Additional information"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :separator="separator"
        hide-bottom
      />
    </div>
    <div class="q-pa-md">
      {{ cleanParticipants }}
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
  </div>
</template>

<script setup>
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, onMounted, ref } from "vue";
import { getMethod } from "src/composables/apiMethod/get";

// global variables
const $q = useQuasar();
const notifyStore = useNotifyStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

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

  participantsRows.value = Array.isArray(cleanParticipants)
    ? cleanParticipants
    : [];

  console.log("Processed participantsRows:", participantsRows.value);
};

onMounted(() => {
  defineId();
});
</script>

<style></style>
