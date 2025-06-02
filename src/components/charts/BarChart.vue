<template>
  <div>
    <q-card class="no-shadow" bordered>
      <q-card-section class="text-h6">
        Tiers
        <q-btn
          icon="fa fa-download"
          class="float-right"
          @click="SaveImage"
          flat
          dense
        >
          <q-tooltip>Download PNG</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <ECharts
          ref="barchart"
          :option="options"
          class="q-mt-md"
          :resizable="true"
          autoresize
          style="height: 300px"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ECharts from "vue-echarts";
import "echarts";

export default defineComponent({
  name: "BarChart",
  setup() {
    return {
      options: {
        legend: {
          bottom: 10,
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "24.05.2025", "25.05.2025", "26.05.2025"],
            ["Challenger", 43.3, 85.8, 93.7],
            ["Futures", 83.1, 73.4, 55.1],
            ["Masters", 86.4, 65.2, 82.5],
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "20%",
          top: "5%",
          containLabel: true,
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      },
    };
  },
  components: {
    ECharts,
  },
  methods: {
    SaveImage() {
      const linkSource = this.$refs.barchart.getDataURL();
      const downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = "_self";
      downloadLink.download = "BarChart.png";
      downloadLink.click();
    },
  },
});
</script>

<style scoped></style>
