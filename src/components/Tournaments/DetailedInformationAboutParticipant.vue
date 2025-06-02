<template>
  <div>
    <q-dialog v-model="isOpenDetailedInformation" persistent>
      <q-card>
        <q-card-section class="">
          <q-list>
            <q-expansion-item
              popup
              icon="filter_1"
              :label="t('informationAboutParticipant')"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span data-testid="fullName" class="infoHeadline">{{
                    t("fullNameText")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      props.detailedInformation.user.userInfo.firstName ||
                      t("notSpecifiedText")
                    }}
                    {{
                      props.detailedInformation.user.userInfo.lastName ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span data-testid="fullName" class="infoHeadline">{{
                    t("ratingText")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      props.detailedInformation.user.userInfo.rating ||
                      t("notSpecifiedText")
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              icon="filter_2"
              :label="t('detailedInformationAboutParticipant.matchHistory')"
            >
              <q-separator />
              <q-card>
                <q-card-section
                  v-for="(match, index) in matchHistory.content"
                  :key="index"
                >
                  <span data-testid="" class="infoHeadline">{{
                    t("detailedInformationAboutParticipant.tournamentName")
                  }}</span>
                  <p class="infoStyle">
                    {{ match.tournamentName }}
                  </p>
                  <span data-testid="" class="infoHeadline">{{
                    t("detailedInformationAboutParticipant.tournamentTier")
                  }}</span>
                  <p class="infoStyle">
                    {{ match.tournamentTier }}
                  </p>
                  <span data-testid="" class="infoHeadline">{{
                    t("detailedInformationAboutParticipant.opponentName")
                  }}</span>
                  <p class="infoStyle">
                    {{ match.opponentName }}
                  </p>

                  <span data-testid="" class="infoHeadline">{{
                    t("detailedInformationAboutParticipant.winnerText")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      match.winnerName ||
                      t(
                        "detailedInformationAboutParticipant.tournamentContinueText"
                      )
                    }}
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
          <h6 class="text-h6 text-center">
            {{ t("tournamentPage.userStats.statsText") }}
          </h6>
          <Pie :data="chartData" :options="chartOptions" />
          <h6 class="text-h6 text-center">
            {{ t("tournamentPage.userStats.tierMatchText") }}
          </h6>
          <Pie :data="tierData" :options="tierOptions" />
        </q-card-section>
        <q-card-actions align="right">
          <BaseCloseButton
            @click="closeDetailedInformationWindow"
            :label="t('closeButton')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref, watch } from "vue";
import BaseCloseButton from "../atoms/BaseCloseButton.vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { useI18n } from "vue-i18n";
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
const { t } = useI18n();

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

const current = ref(1);
const userId = ref(null);

const updateMatchHistory = () => {
  if (userId.value) {
    getMatchHistory(userId.value, current.value);
  }
};

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

const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  updateMatchHistory();
};

ChartJS.register(Title, Tooltip, Legend, ArcElement);

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
  labels: [
    t("detailedInformationAboutParticipant.victories"),
    t("detailedInformationAboutParticipant.defeat"),
  ],
  datasets: [
    {
      label: t("detailedInformationAboutParticipant.distribution"),
      data: [userData.value.totalWins ?? 0, userData.value.totalLosses],
      backgroundColor: ["#4bc0c0", "#f87979"],
      borderWidth: 1,
    },
  ],
}));

const tierData = computed(() => {
  const wins = userData.value?.winsByTier ?? {};

  return {
    labels: ["CHALLENGER", "FUTURES", "MASTERS"],
    datasets: [
      {
        label: t("detailedInformationAboutParticipant.distribution"),
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
