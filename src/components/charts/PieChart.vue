<template>
  <div>
    <q-card class="no-shadow" bordered>
      <q-card-section class="text-h6"> Services </q-card-section>
      <q-card-section>
        <ECharts
          :option="options"
          class="q-mt-md"
          :resizable="true"
          autoresize
          style="height: 285px"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ECharts from "vue-echarts";

export default defineComponent({
  name: "PieChart",
  components: {
    ECharts,
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          top: "bottom",
          bottom: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access source",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "CHILDREN_TRAINING" },
              { value: 735, name: "BEGINNER_TRAINING" },
              { value: 580, name: "AMATEUR_TRAINING" },
              { value: 484, name: "ADVANCED_TRAINING" },
              { value: 300, name: "SPARRING_PARTNER" },
            ],
          },
        ],
      },
    };
  },
});
</script>

<style scoped></style>
