<template>
  <div>
    <q-dialog v-model="isOpenEditCoachInformationWindow" persistent>
      <q-card>
        <q-card-section class="">
          <section class="row q-gutter-md">
            <div class="col">
              <q-input v-model="language" type="text" label="Language" />
              <q-input v-model="city" type="text" label="City" />
              <q-input v-model="service" type="text" label="Service" />
            </div>
            <div class="col">
              <q-input v-model="cost" type="number" label="Cost" />
              <q-input v-model="stadium" type="text" label="Stadium" />
              <q-input v-model="experience" type="text" label="Experience" />
            </div>
          </section>
          <q-input v-model="description" type="text" label="Description" />
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
const cost = ref("");
const service = ref("");
const description = ref("");
const experience = ref("");
const stadium = ref("");

const updateCoachInfo = async () => {
  const params = {};
  if (city.value) params.city = city.value;
  if (language.value) params.language = language.value;
  if (cost.value) params.cost = cost.value;
  if (service.value) params.service = service.value;
  if (description.value) params.description = description.value;
  if (experience.value) params.experience = experience.value;
  if (stadium.value) params.stadium = stadium.value;

  console.log(params);

  putMethod(
    serverURL,
    `coach`,
    `${props.coachID}`,
    coacheInfo,
    $q,
    "Успешно обновлено",
    "Ошибка:",
    params
  );
};
</script>

<style></style>
