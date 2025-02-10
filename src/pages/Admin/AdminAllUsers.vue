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
    <UserDetailedInformation
      :isOpenUserDetailedInformation="isOpenUserDetailedInformation"
      :userInfo="userInfo"
    />
  </div>
  <div v-else data-testid="noData">
    <p>No data</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { Cookies } from "quasar";
import UserDetailedInformation from "src/components/Admin/UserDetailedInformation.vue";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
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
    name: "email",
    label: "Почта",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "name",
    label: "Имя",
    align: "left",
    field: (user) => user.userInfo.firstName,
    sortable: true,
  },
  {
    name: "lastName",
    label: "Фамилия",
    align: "left",
    field: (user) => user.userInfo.lastName,
    sortable: true,
  },
  {
    name: "role",
    label: "Роль",
    align: "left",
    field: "role",
    sortable: true,
  },
];

const rows = ref([]);
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${serverURL}user/all`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      withCredentials: true,
    });

    rows.value = response.data.map((user, index) => ({
      ...user,
      id: index + 1,
    }));

    console.log(rows.value[0].userInfo.firstName);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAllUsers();
});

const isOpenUserDetailedInformation = ref(true);
const userInfo = ref("");
const viewDetailedInformation = (evt, row, index) => {
  isOpenUserDetailedInformation.value = true;
  userInfo.value = row;
};
</script>

<style></style>
