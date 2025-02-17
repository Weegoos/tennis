<template>
  <div>
    <p class="text-weight-regular text-h1 text-center q-mt-xl text-bold">{{ tournament.description }}</p>
    <p class="text-weight-thin text-h5 text-center q-mt-xl text-bold">{{ tournament.location }} - {{ tournament.city }}</p>
    <div class="q-pa-md">


    <q-table
      flat bordered
      title="Additional information"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :separator="separator"
      hide-bottom
    />
  </div>
  </div>
</template>

<script setup>
import { Cookies, QSpinnerGears, useQuasar } from 'quasar';
import axios from 'axios';
import { useNotifyStore } from 'src/stores/notify-store';
import { getCurrentInstance, onMounted, ref } from 'vue';


// global variables
const $q = useQuasar()
const notifyStore = useNotifyStore()
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
    field: 'startTime',
    sortable: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    align: "left",
    field: 'startDate',
    sortable: true,
  },
]

const rows = ref([])

const defineId = () => {
  const url = window.location.hash;
  const match = url.match(/\/hr\/(\d+)/);

  if (match) {
    const id = match[1];
    console.log(id);
    getTournamentsByID(id)
  } else {
    console.log("Не найден id");
  }
};

const tournament = ref('')
const getTournamentsByID = async (id) => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverURL}tournament/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      withCredentials: true,
    });

    console.log(response.data);
    tournament.value = response.data;
    rows.value = [
      {
        id: response.data.id,
        startTime: response.data.startTime,
        description: response.data.description,
        location: response.data.location,
        city: response.data.city,
        startDate: response.data.startDate,
        endDate: response.data.endDate
      }
    ];
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  defineId()
})
</script>

<style></style>
