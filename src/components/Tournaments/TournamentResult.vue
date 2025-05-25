<template>
  <div>
    <q-dialog
      v-model="isOpenWindowForResult"
      persistent
      class="w-[450px] h-[450px]"
    >
      <q-card class="my-card">
        <q-card-section>
          <div>
            <q-splitter v-model="splitterModel" style="height: 250px">
              <template v-slot:before>
                <q-tabs v-model="tab" vertical class="text-teal">
                  <q-tab name="result" icon="mdi-chart-bar" label="Result" />
                  <q-tab name="walkover" icon="mdi-run-fast" label="WalkOver" />
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="result">
                    <q-card-section>
                      <q-select
                        v-model="winner"
                        :options="winnerOptions"
                        label="Winner"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                      />

                      <q-input
                        v-model="score"
                        type="text"
                        label="Score"
                        hint="For Example: 6:1 6:0"
                      />
                    </q-card-section>
                    <q-card-actions align="right" class="q-gutter-sm">
                      <BaseCloseButton
                        @click="closeTournamentResultWindow"
                        label="Close"
                      />
                      <BasePostButton @click="sendInfo" label="Send" />
                    </q-card-actions>
                  </q-tab-panel>
                  <q-tab-panel name="walkover">
                    <q-card-section>
                      <q-select
                        v-model="winner"
                        :options="winnerOptions"
                        label="Winner"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                      />
                    </q-card-section>
                    <q-card-actions align="right" class="q-gutter-sm">
                      <BaseCloseButton
                        @click="closeTournamentResultWindow"
                        label="Close"
                      />
                      <BasePostButton
                        @click="sendWalkOverWinner"
                        label="Send"
                      />
                    </q-card-actions>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, watch } from "vue";
import BaseCloseButton from "../atoms/BaseCloseButton.vue";
import BasePostButton from "../atoms/BasePostButton.vue";
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";

// global variables
const props = defineProps({
  isOpenResultWindow: {
    type: Boolean,
    required: true,
  },
  matchInformation: {
    type: Object,
    required: true,
  },
  matchID: {
    type: Number,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const adminURL = proxy.$adminURL;
const $q = useQuasar();

const winnerOptions = ref([]);
const winner = ref("");
const score = ref("");
const tab = ref("result");

const isOpenWindowForResult = ref(props.isOpenResultWindow);
watch(
  () => props.isOpenResultWindow,
  (newVal) => {
    isOpenWindowForResult.value = newVal;
  }
);

watch(
  () => props.matchInformation,
  (newVal) => {
    if (newVal) {
      winnerOptions.value = [
        {
          label: newVal.participant1Name,
          value: newVal.participant1RegistrationId,
        },
        {
          label: newVal.participant2Name,
          value: newVal.participant2RegistrationId,
        },
      ];
    }
  }
);

const sendInfo = async () => {
  try {
    const payload = {
      winnerRegistrationId: winner.value,
      score: score.value,
    };
    await putMethod(
      adminURL,
      `tournaments/matches/${props.matchID}/result`,
      payload,
      $q,
      "Good",
      "Error: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const sendWalkOverWinner = async () => {
  try {
    const payload = {
      winnerRegistrationId: winner.value,
    };
    await putMethod(
      adminURL,
      `tournaments/matches/${props.matchID}/walkover`,
      payload,
      $q,
      "Walkover",
      "Error: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const emit = defineEmits(["closeTournamentResultWindow"]);

const closeTournamentResultWindow = () => {
  emit("closeTournamentResultWindow");
};
</script>

<style></style>
