<template>
  <div>
    <div>
      <q-tabs v-model="tab" class="text-black">
        <q-tab name="eight" label="1/8" />
        <q-tab name="four" label="1/4" />
        <q-tab name="semi-final" label="1/2" />
        <q-tab name="final" label="Final" no-caps />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="eight">
          <div class="wrapper">
            <div class="item">
              <div class="item-childrens">
                <div class="item-child">
                  <div
                    class="item q-ml-md"
                    v-for="(final, index) in eighthFinals"
                    :key="index"
                    @click="getInfoAboutMatch(final)"
                  >
                    <div class="item-parent">
                      <p
                        :class="
                          ['COMPLETED', 'WALKOVER'].includes(final.status)
                            ? 'winner'
                            : 'item-background'
                        "
                      >
                        {{ final.winnerName || "Турнир еще проводится" }}
                        <q-badge
                          v-if="final.score"
                          class="bg-transparent text-black"
                          :label="final.score"
                        />
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant1Name || "Турнир еще проводится"
                          }}
                          <q-badge
                            align="top"
                            v-if="final.participant1SeedNumber"
                            >{{ final.participant1SeedNumber }}</q-badge
                          >
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant2Name || "Турнир еще проводится"
                          }}
                          <q-badge
                            align="top"
                            v-if="final.participant2SeedNumber"
                            >{{ final.participant2SeedNumber }}</q-badge
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="four">
          <div class="wrapper">
            <div class="item">
              <div class="item-childrens">
                <div class="item-child">
                  <div
                    class="item q-ml-md"
                    v-for="(final, index) in fourFinals"
                    :key="index"
                  >
                    <div class="item-parent">
                      <p
                        :class="
                          ['COMPLETED', 'WALKOVER'].includes(final.status)
                            ? 'winner'
                            : 'item-background'
                        "
                      >
                        {{ final.winnerName || "Турнир еще проводится" }}
                        <q-badge
                          v-if="final.score"
                          class="bg-transparent text-black"
                          :label="final.score"
                        />
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant1Name || "Турнир еще проводится"
                          }}
                          <q-badge
                            align="top"
                            v-if="final.participant1SeedNumber"
                            >{{ final.participant1SeedNumber }}</q-badge
                          >
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant2Name || "Турнир еще проводится"
                          }}
                          <q-badge
                            align="top"
                            v-if="final.participant2SeedNumber"
                            >{{ final.participant2SeedNumber }}</q-badge
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="semi-final">
          <div class="wrapper">
            <div class="item">
              <div class="item-childrens">
                <div class="item-child">
                  <div
                    class="item q-ml-md"
                    v-for="(final, index) in semiFinals"
                    :key="index"
                  >
                    <div class="item-parent">
                      <p
                        :class="
                          ['COMPLETED', 'WALKOVER'].includes(final.status)
                            ? 'winner'
                            : 'item-background'
                        "
                      >
                        {{ final.winnerName || "Турнир еще проводится" }}
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant1Name || "Турнир еще проводится"
                          }}
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant2Name || "Турнир еще проводится"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="final">
          <div class="wrapper">
            <div class="item">
              <div class="item-childrens">
                <div class="item-child">
                  <div
                    class="item q-ml-md"
                    v-for="(final, index) in finals"
                    :key="index"
                  >
                    <div class="item-parent">
                      <p
                        :class="
                          ['COMPLETED', 'WALKOVER'].includes(final.status)
                            ? 'winner'
                            : 'item-background'
                        "
                      >
                        {{ final.winnerName || "Турнир еще проводится" }}
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant1Name || "Турнир еще проводится"
                          }}
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{
                            final.participant2Name || "Турнир еще проводится"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <div v-if="matchStatus != completedMatchStatus">
        <TournamentResult
          :isOpenResultWindow="isOpenResultWindow"
          @closeTournamentResultWindow="closeTournamentResultWindow"
          :matchInformation="Object(matchInformation)"
          :matchID="Number(matchID)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import TournamentResult from "./TournamentResult.vue";

// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const completedMatchStatus = proxy.$completedMatchStatus;
const props = defineProps({
  tournamentID: {
    type: String,
    required: true,
    default: undefined,
  },
});

watch(
  () => props.tournamentID,
  (newVal) => {
    fetchBracket(newVal);
  }
);

const eighthFinals = ref([]);
const fourFinals = ref([]);
const semiFinals = ref([]);
const bracketData = ref([]);
const finals = ref([]);

const tab = ref("eight");
async function fetchBracket(tournamentID) {
  try {
    const response = await getMethod(
      serverURL,
      `tournament/${tournamentID}/bracket`,
      bracketData,
      $q,
      "Error:"
    );

    eighthFinals.value = response.filter(
      (match) => match.roundName === "1/8 финала"
    );

    fourFinals.value = response.filter(
      (match) => match.roundName === "Четвертьфинал"
    );

    semiFinals.value = response.filter(
      (match) => match.roundName === "Полуфинал"
    );

    finals.value = response.filter((match) => match.roundName === "Финал");
  } catch (err) {
    console.error(err);
  }
}

const isOpenResultWindow = ref(false);
const matchStatus = ref(null);
const matchInformation = ref([]);
const matchID = ref(null);
const getInfoAboutMatch = (info) => {
  console.log(info);
  isOpenResultWindow.value = true;
  matchStatus.value = info.status;
  matchInformation.value = info;
  matchID.value = info.id;
};

const closeTournamentResultWindow = () => {
  isOpenResultWindow.value = false;
};

onMounted(() => {});
</script>
<style scoped>
.winner {
  font-weight: 700;
  background-color: #d4edda;
  border-color: #28a745;
}
</style>
