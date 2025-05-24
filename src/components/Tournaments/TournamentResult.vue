<template>
  <div>
    <q-dialog v-model="isOpenWindowForResult" persistent>
      <q-card>
        <q-card-section>
          <q-input
            v-model="number"
            type="text"
            label="Winner Registration Id"
          />
          <q-input
            v-model="text"
            type="text"
            label="Score"
            hint="For Example: 6:1 6:21"
          />
        </q-card-section>
        <q-card-actions align="right" class="q-gutter-sm">
          <BaseCloseButton @click="closeTournamentResultWindow" />
          <BasePostButton />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseCloseButton from "../atoms/BaseCloseButton.vue";
import BasePostButton from "../atoms/BasePostButton.vue";
// global variables
const props = defineProps({
  isOpenResultWindow: {
    type: Boolean,
    required: true,
  },
});

const isOpenWindowForResult = ref(props.isOpenResultWindow);
watch(
  () => props.isOpenResultWindow,
  (newVal) => {
    isOpenWindowForResult.value = newVal;
  }
);

const emit = defineEmits(["closeTournamentResultWindow"]);

const closeTournamentResultWindow = () => {
  emit("closeTournamentResultWindow");
};
</script>

<style></style>
