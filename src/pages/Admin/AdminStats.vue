<template>
  <div v-if="role === 'ADMIN'">
    <q-page class="">
      <q-card class="my-card">
        <q-card-section>
          <div ref="chart" style="width: 100%; height: 400px"></div>
          <bar-chart></bar-chart>
          <line-chart></line-chart>
          <pie-chart></pie-chart>
        </q-card-section>
      </q-card>
    </q-page>
    <q-page class=""> </q-page>
  </div>
  <div v-else>У вас нет прав для просмотра данной страницы</div>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  defineComponent,
  defineAsyncComponent,
} from "vue";
import * as echarts from "echarts";
import { getMethod } from "src/composables/apiMethod/get";
import { useQuasar } from "quasar";
import { useApiStore } from "src/stores/api-store";
import { redirectForUserThatOpenAdminPage } from "src/composables/javascriptFunction/redirectToTheAuthPage";

const PieChart = defineAsyncComponent(() =>
  import("components/charts/PieChart.vue")
);
const LineChart = defineAsyncComponent(() =>
  import("components/charts/LineChart.vue")
);
const BarChart = defineAsyncComponent(() =>
  import("components/charts/BarChart.vue")
);

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();

const totalTournaments = ref(null);
const totalUsers = ref(null);
const totalPartner = ref(null);

const defineLength = async () => {
  try {
    await getMethod(serverURL, "tournament", totalTournaments, $q, "Error: ");
    await getMethod(serverURL, "user/all", totalUsers, $q, "Error: ");
    await getMethod(serverURL, "partner/all", totalPartner, $q, "Error: ");
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
      data: ["Турниры", "Пользователи", "Партнеры"],
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
      {
        name: "Партнеры",
        type: "bar",
        data: [totalPartner.value ? totalPartner.value.length : 0], // Количество пользователей
      },
    ],
  };

  myChart.setOption(option);
};

// Отслеживаем изменения как для totalTournaments, так и для totalUsers
watch([totalTournaments, totalUsers, totalPartner], () => {
  updateChart();
});

const role = ref(null);
const getAdminRole = async () => {
  await apiStore.getUserProfile();
  role.value = apiStore.userData.role;
};

onMounted(() => {
  defineLength();
  getAdminRole();
  redirectForUserThatOpenAdminPage();
});
</script>

<style scoped>
/* можно добавить стиль для графика, если нужно */
</style>
