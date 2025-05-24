<template>
  <div>
    <div>
      <q-tabs v-model="tab" class="text-black">
        <q-tab name="eight" label="1/8" />
        <q-tab name="four" label="1/4" />
        <q-tab name="semi-final" label="1/2" />
        <q-tab name="final" label="Final" />
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
                  >
                    <div class="item-parent">
                      <p
                        :class="
                          ['COMPLETED', 'WALKOVER'].includes(final.status)
                            ? 'winner'
                            : 'item-background'
                        "
                      >
                        {{ final.winnerName || "Not completed" }}
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant1Name }}
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant2Name }}
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
                        {{ final.winnerName || "" }}
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant1Name }}
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant2Name }}
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
                        {{ final.winnerName || "" }}
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant1Name }}
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant2Name }}
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
                        {{ final.winnerName || "" }}
                      </p>
                    </div>
                    <div class="item-childrens">
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant1Name }}
                        </p>
                      </div>
                      <div class="item-child">
                        <p class="item-background">
                          {{ final.participant2Name }}
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
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, reactive, ref, watch } from "vue";

// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
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
    console.log(newVal);
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
    console.log(semiFinals.value);
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {});
</script>
<style scoped>
.winner {
  font-weight: 700;
  background-color: #d4edda;
  border-color: #28a745;
}
</style>
