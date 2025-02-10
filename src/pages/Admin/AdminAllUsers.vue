<template>
  <div class="q-pa-md">
    <q-table
      data-testid="userTable"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { Cookies } from "quasar";
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

const viewDetailedInformation = () => {};
</script>

<style></style>
