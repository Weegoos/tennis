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
      :coachesInfo="coachesInfo"
      @closeCoacheDetailedInformation="closeCoacheDetailedInformation"
    />
  </div>
  <div v-else data-testid="noData">
    <p>No data</p>
  </div>
</template>

<script setup>
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, onMounted, ref } from "vue";
import CoachesDetailedInformation from "src/components/Admin/CoachesDetailedInformation.vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const notifyStore = useNotifyStore();
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
  notifyStore.loading(
    $q,
    "Подождите данные о тренерах грузится...",
    QSpinnerGears
  );
  try {
    const response = await axios.get(`${serverURL}coach?enabled=false`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    console.log(response.data);
    notifyStore.nofifySuccess($q, "Данные о тренере успешно загружены");
    rows.value = response.data.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
  } catch (error) {
    console.log(error);
    notifyStore.notifyError(
      $q,
      `Ошибка при получении данных о тренере: ${error}`
    );
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  getEnabledCoaches();
});

const isOpenCoachesDetailedInformation = ref(false);
const coachesInfo = ref("");
const viewDetailedInformation = (evt, row, index) => {
  isOpenCoachesDetailedInformation.value = true;
  coachesInfo.value = row;
};

const closeCoacheDetailedInformation = () => {
  isOpenCoachesDetailedInformation.value = false;
};
</script>

<style></style>
