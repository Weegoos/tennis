<template>
  <div v-if="role === 'ADMIN'">
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
  </div>
  <div v-else>У вас нет прав для просмотра данной страницы</div>
</template>

<script setup>
import axios from "axios";
import { Cookies, useQuasar } from "quasar";
import UserDetailedInformation from "src/components/Admin/UserDetailedInformation.vue";
import { getMethod } from "src/composables/apiMethod/get";
import { redirectForUserThatOpenAdminPage } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const $q = useQuasar();
const apiStore = useApiStore();

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
      rows.value = rows.value.data.map((user, index) => ({
        ...user,
      }));
      console.log(rows);
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

  getAllUsers(current.value);
};

const role = ref(null);
const getAdminRole = async () => {
  await apiStore.getUserProfile();
  role.value = apiStore.userData.role;
};

onMounted(() => {
  getAllUsers(current.value);
  redirectForUserThatOpenAdminPage();
  getAdminRole();
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
