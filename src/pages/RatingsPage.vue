<template>
  <div>
    <q-table
      flat
      bordered
      title="Leaderboard"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

// global variables
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;

onMounted(() => {
  redirectToUser();
});

const columns = computed(() => [
  {
    name: "firstName",
    required: true,
    label: t("firstNameText"),
    align: "center",
    field: (val) => val.firstName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "lastName",
    align: "center",
    label: t("lastNameText"),
    field: "lastName",
    sortable: true,
  },
  {
    name: "points",
    required: true,
    label: "Points",
    align: "center",
    field: "points",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "rating",
    label: t("ratingText"),
    field: "rating",
    sortable: true,
    align: "center",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
]);

const leaderBoard = ref([]);
const rows = ref([]);

const getLeaderBoardPoints = async (page) => {
  try {
    await getMethod(
      serverURL,
      `user/points-leaderboard?page=${page}&size=${maxNumberOfRequestPerPage}`,
      leaderBoard,
      $q,
      "Ошибка при получении пользоветелй поо поиску: "
    );

    rows.value = leaderBoard.value.data;

    console.log(rows.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getLeaderBoardPoints(1);
});
</script>

<style></style>
