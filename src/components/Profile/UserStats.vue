<template>
  <div>
    <q-card-section class="grid grid-rows-1 grid-cols-2 h-[250px]">
      <div class="h-[450px]" align="center">
        <h6 class="text-h6 text-center">Статистика игрока</h6>
        <Pie :data="chartData" :options="chartOptions" />
      </div>
      <div class="h-[450px]" align="center">
        <h6 class="text-h6 text-center">Матчи по тирам</h6>
        <Pie :data="tierData" :options="tierOptions" />
      </div>
    </q-card-section>
  </div>
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";

//global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const $q = useQuasar();

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const userData = ref([]);

const getData = async (id) => {
  console.log(id);

  try {
    await getMethod(serverURL, `profile/stats`, userData, $q, "Error:");
  } catch (error) {
    console.error(error);
  }
};

const chartData = computed(() => ({
  labels: ["Победы", "Поражение"],
  datasets: [
    {
      label: "Распределение",
      data: [userData.value.totalWins ?? 0, userData.value.totalLosses],
      backgroundColor: ["#4bc0c0", "#f87979"],
      borderWidth: 1,
    },
  ],
}));

const tierData = computed(() => {
  const wins = userData.value?.winsByTier ?? {};

  return {
    labels: ["Challenger", "FUTURES", "Masters"],
    datasets: [
      {
        label: "Распределение",
        data: [wins.CHALLENGER ?? 0, wins.FUTURES ?? 0, wins.MASTERS ?? 0],
        backgroundColor: ["#f87979", "#36a2eb", "#4bc0c0"],
        borderWidth: 1,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

const tierOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

onMounted(() => {
  getData();
});
</script>

<style></style>
