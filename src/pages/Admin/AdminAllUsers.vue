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
      hide-bottom=""
    />
    <UserDetailedInformation
      :isOpenUserDetailedInformation="isOpenUserDetailedInformation"
      :userInfo="Object(userInfo)"
      @closeUserDetailedInformation="closeUserDetailedInformation"
    />
  </div>
  <div v-else data-testid="noData">
    <p>No data</p>
  </div>
  <q-pagination
    class="justify-center"
    v-model="current"
    :min="1"
    :max="maxPage"
    @update:model-value="pagination"
  />
</template>

<script setup>
import axios from "axios";
import { Cookies, useQuasar } from "quasar";
import UserDetailedInformation from "src/components/Admin/UserDetailedInformation.vue";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
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
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "name",
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
    name: "role",
    label: "Role",
    align: "left",
    field: "role",
    sortable: true,
  },
];

const rows = ref([]);
const maxPage = ref("");
const getAllUsers = async (page) => {
  try {
    await getMethod(
      serverURL,
      `user/page?page=${page}`,
      rows,
      $q,
      "Ошибка при получении данных о тренерах"
    ).then(() => {
      maxPage.value = Math.ceil(
        rows.value.totalElements / maxNumberOfRequestPerPage
      );
      rows.value = rows.value.content.map((user, index) => ({
        ...user,
      }));
    });
  } catch (error) {
    console.error(error);
  }
};

const current = ref(1);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  console.log(current.value);

  getAllUsers(current.value - 1);
};

onMounted(() => {
  getAllUsers(current.value - 1);
});

const isOpenUserDetailedInformation = ref(false);
const userInfo = ref("");
const viewDetailedInformation = (evt, row, index) => {
  isOpenUserDetailedInformation.value = true;
  userInfo.value = row;
};

const closeUserDetailedInformation = () => {
  isOpenUserDetailedInformation.value = false;
};
</script>

<style></style>
