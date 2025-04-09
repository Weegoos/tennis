<template>
  <q-page class="">
    <q-card class="my-card">
      <q-card-section>
        <div ref="chart" style="width: 100%; height: 400px"></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { getMethod } from "src/composables/apiMethod/get";
import { useQuasar } from "quasar";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const totalTournaments = ref(null);
const totalUsers = ref(null);

const defineLength = async () => {
  try {
    await getMethod(serverURL, "tournament", totalTournaments, $q, "Error: ");
    await getMethod(serverURL, "user/all", totalUsers, $q, "Error: ");
    console.log(totalTournaments.value.length);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

const chart = ref(null);

const updateChart = () => {
  const myChart = echarts.init(chart.value);

  const option = {
    title: {
      text: "Общая аналитика",
    },
    tooltip: {},
    legend: {
      data: ["Турниры", "Пользователи"],
    },
    xAxis: {
      data: ["Общее количество"],
    },
    yAxis: {},
    series: [
      {
        name: "Турниры",
        type: "bar",
        data: [totalTournaments.value ? totalTournaments.value.length : 0], // Количество турниров
      },
      {
        name: "Пользователи",
        type: "bar",
        data: [totalUsers.value ? totalUsers.value.length : 0], // Количество пользователей
      },
    ],
  };

  myChart.setOption(option);
};

// Отслеживаем изменения как для totalTournaments, так и для totalUsers
watch([totalTournaments, totalUsers], () => {
  updateChart();
});

onMounted(() => {
  defineLength();
});
</script>

<style scoped>
/* можно добавить стиль для графика, если нужно */
</style>
