<template>
  <div>
    <q-dialog v-model="isOpenEditCoachInformationWindow" persistent>
      <q-card>
        <q-card-section class="row q-gutter-md">
          <q-input v-model="language" type="text" label="Language" />
          <q-input v-model="city" type="text" label="City" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="red-4"
            @click="closeEditCoachInformationWindow"
          />
          <q-btn label="Update" color="orange-4" @click="updateCoachInfo" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { getCurrentInstance, ref, watch } from "vue";

// global variabels
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const props = defineProps({
  openCoachEditWindow: {
    type: Boolean,
    required: true,
  },
  coachID: {
    type: Number,
    required: true,
  },
});
const isOpenEditCoachInformationWindow = ref(props.openCoachEditWindow);

watch(
  () => props.openCoachEditWindow,
  (newVal) => {
    isOpenEditCoachInformationWindow.value = newVal;
  }
);

const emit = defineEmits(["closeEditCoachInformationWindow"]);
const closeEditCoachInformationWindow = () => {
  emit("closeEditCoachInformationWindow");
};
// http://localhost:8000/api/v1/coach/1?city=ASTANA&language=English
const coacheInfo = ref("");

const city = ref("");
const language = ref("");

const updateCoachInfo = async () => {
  const params = {};
  if (city.value) params.city = city.value;
  if (language.value) params.language = language.value;
  console.log(params);

  putMethod(
    serverURL,
    `coach`,
    `${props.coachID}`,
    coacheInfo.value,
    $q,
    "Успешно обновлено",
    "Ошибка:",
    params
  );
};
</script>

<style></style>
