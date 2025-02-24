<template>
  <div class="q-pa-md" data-testid="rowsID" v-if="rows && rows.length">
    <q-table
      data-testid="userTable"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
    />
    <CoachesDetailedInformation
      :isOpenCoachesDetailedInformation="isOpenCoachesDetailedInformation"
      :coachesInfo="Object(coachesInfo)"
      @closeCoacheDetailedInformation="closeCoacheDetailedInformation"
    />
  </div>
  <div v-else data-testid="noData">
    <p>No data</p>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref } from "vue";
import CoachesDetailedInformation from "src/components/Admin/CoachesDetailedInformation.vue";
import { getMethod } from "src/composables/apiMethod/get";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const columns = [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "fullName",
    label: "Full Name",
    align: "left",
    field: (coaches) => `${coaches.user.lastName} ${coaches.user.firstName}`,
    sortable: true,
  },
  {
    name: "city",
    label: "City",
    align: "left",
    field: "city",
    sortable: true,
  },
  {
    name: "language",
    label: "Language",
    align: "left",
    field: "language",
    sortable: true,
  },
  {
    name: "stadium",
    label: "Stadium",
    align: "left",
    field: "stadium",
    sortable: true,
  },
];

const rows = ref([]);
const getEnabledCoaches = async () => {
  getMethod(
    serverURL,
    "coach?enabled=false",
    rows,
    $q,
    "Ошибка при получении данных о тренерах"
  ).then(() => {
    rows.value = rows.value.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
  });
};

onMounted(() => {
  getEnabledCoaches();
});

const isOpenCoachesDetailedInformation = ref(false);
const coachesInfo = ref([]);
const viewDetailedInformation = (evt, row, index) => {
  isOpenCoachesDetailedInformation.value = true;
  coachesInfo.value = row;
};

const closeCoacheDetailedInformation = () => {
  isOpenCoachesDetailedInformation.value = false;
};
</script>

<style></style>
