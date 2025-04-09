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
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

// Предположим, что у тебя есть данные о пользователях и турнирах
const totalTournaments = 15; // Примерное количество турниров
const totalUsers = 120; // Примерное количество пользователей

const defineLength = async () => {};

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const option = {
    title: {
      text: "Аналитика по турнирам и пользователям",
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
        data: [totalTournaments], // Используем количество турниров
      },
      {
        name: "Пользователи",
        type: "bar",
        data: [totalUsers], // Используем количество пользователей
      },
    ],
  };

  myChart.setOption(option);
});
</script>

<style scoped>
/* можно добавить стиль для графика, если нужно */
</style>
