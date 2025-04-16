<template>
  <q-page class="">
    <q-card class="my-card">
      <q-card-section>
        <div ref="chart" style="width: 100%; height: 400px"></div>
      </q-card-section>
    </q-card>
  </q-page>
  <q-page class="q-pa-sm">
    <card-social icon_position="left" />

    <card-charts />

    <div class="row q-col-gutter-sm q-py-sm">
      <tab-social />
      <card-with-image />
    </div>

    <div class="row q-col-gutter-sm q-pb-sm">
      <todo-list />

      <card-time-line />
    </div>

    <table-visits />
  </q-page>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  defineAsyncComponent,
} from "vue";
import * as echarts from "echarts";
import { getMethod } from "src/composables/apiMethod/get";
import { useQuasar } from "quasar";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

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

onMounted(() => {
  defineLength();
});

const mode = ref("list");
const messages = ref([
  {
    id: 5,
    name: "Pratik Patel",
    msg:
      " -- I'll be in your neighborhood doing errands this\n" +
      "            weekend. Do you want to grab brunch?",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4",
    time: "10:42 PM",
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    msg:
      " -- I'll be in your neighborhood doing errands this\n" +
      "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
    time: "11:17 AM",
  },
  {
    id: 1,
    name: "Boy",
    msg:
      " -- I'll be in your neighborhood doing errands this\n" +
      "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    time: "5:17 AM",
  },
  {
    id: 2,
    name: "Jeff Galbraith",
    msg:
      " -- I'll be in your neighborhood doing errands this\n" +
      "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
    time: "5:17 AM",
  },
  {
    id: 3,
    name: "Razvan Stoenescu",
    msg:
      " -- I'll be in your neighborhood doing errands this\n" +
      "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
    time: "5:17 AM",
  },
]);

const CardSocial = defineAsyncComponent(() =>
  import("../../components/Admin/CardSocial.vue")
);
const CardCharts = defineAsyncComponent(() =>
  import("../../components/Admin/CardCharts.vue")
);
const TabSocial = defineAsyncComponent(() =>
  import("../../components/Admin/TabSocial.vue")
);
const CardWithImage = defineAsyncComponent(() =>
  import("components/cards/CardWithImage.vue")
);
const CardTimeLine = defineAsyncComponent(() =>
  import("components/cards/CardTimeLine.vue")
);
const TodoList = defineAsyncComponent(() =>
  import("components/list/TodoList.vue")
);
const TableVisits = defineAsyncComponent(() =>
  import("components/tables/TableVisits.vue")
);
</script>

<style scoped>
/* можно добавить стиль для графика, если нужно */
</style>
