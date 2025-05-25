<template>
  <div>
    <q-dialog v-model="isOpenWindowForResult" persistent>
      <q-card>
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
            @click="closeDetailedInformationWindow"
            label="Close"
          />
          <BasePostButton @click="sendInfo" label="Send" />
        </q-card-actions>
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
const serverURL = "http://localhost:8000/api/admin/";
const $q = useQuasar();

const winnerOptions = ref([]);
const winner = ref("");
const score = ref("");

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
      "http://localhost:8000/api/admin/",
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

const emit = defineEmits(["closeTournamentResultWindow"]);

const closeTournamentResultWindow = () => {
  emit("closeTournamentResultWindow");
};
</script>

<style></style>
