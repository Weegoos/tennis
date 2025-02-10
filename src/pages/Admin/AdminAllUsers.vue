<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
    />

    <UserDetailedInformation
      :isOpenAdminDialogPage="isOpenAdminDialogPage"
      @closeAdminDialogPage="closeAdminDialogPage"
      :conclusionDetailedInformation="conclusionDetailedInformation"
    />
  </div>
</template>

<script setup>
import UserDetailedInformation from "./DetailedInformation/UserDetailedInformation.vue";

import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;

const $q = useQuasar();
const notifyStore = useNotifyStore();
const javascriptFunction = useJavaScriptFunction();

const accessToken = Cookies.get("access_token");
// const pagination = ref({ rowsPerPage: 0 });

const defineToken = () => {
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  } else {
    getAllUsers();
  }
};

onMounted(() => {
  defineToken();
});

const columns = [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "name",
    label: "Имя",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "surname",
    label: "Фамилия",
    align: "left",
    field: "secondName",
    sortable: true,
  },
  {
    name: "email",
    label: "Почта",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "iin",
    label: "ИИН",
    align: "left",
    field: "iin",
    sortable: true,
  },
  {
    name: "jobTitle",
    label: "Должность",
    align: "left",
    field: (user) => user.jobTitle.name,
    sortable: true,
  },
  {
    name: "department",
    label: "Департамент",
    align: "left",
    field: (user) => user.department.name,
    sortable: true,
  },
  {
    name: "region",
    label: "Регион",
    align: "left",
    field: (user) => user.department.region,
    sortable: true,
  },
  {
    name: "registrationDate",
    label: "Дата регистрации",
    align: "left",
    field: "registrationDate",
    format: (val) => javascriptFunction.formatDate(val),
    sortable: true,
  },
  {
    name: "conclusions",
    label: "Количество документов",
    align: "center",
    field: (user) => user.conclusions.length,
    sortable: true,
  },
];

const rows = ref([]);
const isOpenAdminDialogPage = ref(false);
const conclusionDetailedInformation = ref("");

const getAllUsers = async () => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverUrl}allUsers`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    rows.value = response.data.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    console.log("response.data:", response.data);
    notifyStore.nofifySuccess($q, "Все пользователи успешно загружены");
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при получении всех пользователей:", error);
    throw error;
  }
};
const viewDetailedInformation = (evt, row, index) => {
  isOpenAdminDialogPage.value = true;
  conclusionDetailedInformation.value = row;
};

const closeAdminDialogPage = () => {
  isOpenAdminDialogPage.value = false;
};
</script>

<style scoped></style>
