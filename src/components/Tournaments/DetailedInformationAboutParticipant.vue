<template>
  <div>
    <q-dialog v-model="isOpenDetailedInformation" persistent>
      <q-card>
        <q-card-section class="">
          <q-list>
            <q-expansion-item
              popup
              icon="filter_1"
              label="Information about the participant"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span data-testid="fullName" class="infoHeadline"
                    >Full name</span
                  >
                  <p class="infoStyle">
                    {{
                      props.detailedInformation.user.userInfo.firstName ||
                      "Not specified"
                    }}
                    {{
                      props.detailedInformation.user.userInfo.lastName ||
                      "Not specified"
                    }}
                  </p>
                  <span data-testid="fullName" class="infoHeadline"
                    >Rating</span
                  >
                  <p class="infoStyle">
                    {{
                      props.detailedInformation.user.userInfo.rating ||
                      "Not specified"
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item popup icon="filter_2" label="Match history">
              <q-separator />
              <q-card>
                <q-card-section
                  v-for="(match, index) in matchHistory.content"
                  :key="index"
                >
                  <span data-testid="" class="infoHeadline"
                    >Tournament Name</span
                  >
                  <p class="infoStyle">
                    {{ match.tournamentName }}
                  </p>
                  <span data-testid="" class="infoHeadline"
                    >Tournament Tier</span
                  >
                  <p class="infoStyle">
                    {{ match.tournamentTier }}
                  </p>
                  <span data-testid="" class="infoHeadline">Opponent Name</span>
                  <p class="infoStyle">
                    {{ match.opponentName }}
                  </p>

                  <span data-testid="" class="infoHeadline">Winner</span>
                  <p class="infoStyle">
                    {{ match.winnerName || "Турнир продолжается" }}
                  </p>
                </q-card-section>
                <q-pagination
                  class="justify-center q-my-sm text-center"
                  v-model="current"
                  :min="1"
                  :max="maxPage"
                  @update:model-value="pagination"
                />
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <h6 class="text-h6 text-center">Статистика игрока</h6>
          <Pie :data="chartData" :options="chartOptions" />
          <h6 class="text-h6 text-center">Матчи по тирам</h6>
          <Pie :data="tierData" :options="tierOptions" />
        </q-card-section>
        <q-card-actions align="right">
          <BaseCloseButton
            @click="closeDetailedInformationWindow"
            label="Close"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import BaseCloseButton from "../atoms/BaseCloseButton.vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
// global variables
const props = defineProps({
  openWindowAboutParticipant: {
    type: Boolean,
    required: true,
    default: false,
  },
  detailedInformation: {
    type: Object,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const $q = useQuasar();

const isOpenDetailedInformation = ref(props.openWindowAboutParticipant);

watch(
  () => props.openWindowAboutParticipant,
  (newVal) => {
    isOpenDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeDetailedInformationWindow"]);

const closeDetailedInformationWindow = () => {
  emit("closeDetailedInformationWindow");
};

// match history
const matchHistory = ref([]);
const getMatchHistory = async (id, page) => {
  try {
    await getMethod(
      serverURL,
      `users/${id}/matches?page=${page}&size=${maxNumberOfRequestPerPage}`,
      matchHistory,
      $q,
      "Error: "
    );
    console.log(matchHistory.value);
  } catch (error) {
    console.error(error);
  }
};

const maxPage = ref("");
watch(
  () => matchHistory.value,
  (newVal) => {
    if (newVal && newVal.totalElements) {
      maxPage.value = Math.ceil(
        newVal.totalElements / maxNumberOfRequestPerPage
      );
    } else {
      maxPage.value = 1;
    }
  }
);

const current = ref(1); // текущая страница
const userId = ref(null); // id пользователя из props

// Общая функция получения истории матчей
const updateMatchHistory = () => {
  if (userId.value) {
    getMatchHistory(userId.value, current.value);
  }
};

// Watch на detailedInformation
watch(
  () => props.detailedInformation,
  (newVal) => {
    if (newVal?.id) {
      userId.value = newVal.primaryPlayer.id;
      current.value = 1;
      updateMatchHistory();
      getData(userId.value);
    }
  }
);

// Пагинация
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  updateMatchHistory();
};

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Данные для Pie диаграммы
const userData = ref([]);

const getData = async (id) => {
  console.log(id);

  try {
    await getMethod(serverURL, `users/${id}/stats`, userData, $q, "Error:");
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
</script>

<style></style>
