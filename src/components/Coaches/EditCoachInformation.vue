<template>
  <div>
    <q-dialog
      v-model="isOpenEditCoachInformationWindow"
      persistent
      :full-width="$q.screen.width < mobileWidth ? true : false"
    >
      <q-card :style="$q.screen.width < mobileWidth ? '' : 'width: 800px'">
        <q-card-section class="">
          <section class="row q-gutter-md">
            <div class="col">
              <q-select
                v-model="city"
                :options="cityOptions"
                :label="t('cityText')"
              />
              <q-select
                v-model="language"
                :options="languageList"
                :label="t('languageText')"
              />
              <q-select
                v-model="service"
                :options="serviceOptions"
                :label="t('serviceText')"
              />
            </div>
            <div class="col">
              <q-input v-model="cost" type="number" :label="t('costText')" />
              <q-select
                v-model="stadium"
                :options="stadiumList"
                :label="t('stadiumText')"
              />
              <q-input
                v-model="experience"
                type="number"
                :label="t('experienceText')"
              />
            </div>
          </section>
          <q-input
            v-model="description"
            type="text"
            :label="t('description')"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('closeButton')"
            no-caps
            color="red-4"
            @click="closeEditCoachInformationWindow"
          />
          <q-btn
            no-caps
            :label="t('coachPage.editCoach.updateButton')"
            color="orange-4"
            @click="updateCoachInfo"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import stadiumJSON from "../../composables/stadium.json";
import { useI18n } from "vue-i18n";
// global variabels
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();
const mobileWidth = proxy.$mobileWidth;
const { t } = useI18n();

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

const language = ref(null);
const languageList = ref(["Batyr"]);
const cityOptions = ref([]);
const getAllList = async () => {
  try {
    await apiStore.getLanguage(serverURL, $q);
    languageList.value = apiStore.language.value;
    await apiStore.getCity(serverURL, $q);
    cityOptions.value = apiStore.city.value;

    await apiStore.getService(serverURL, $q);
    serviceOptions.value = apiStore.service.value;
  } catch (error) {
    console.error(error);
  }
};

const emit = defineEmits(["closeEditCoachInformationWindow"]);
const closeEditCoachInformationWindow = () => {
  emit("closeEditCoachInformationWindow");
};
const coacheInfo = ref("");

const city = ref("");
const cost = ref("");
const service = ref("");
const description = ref("");
const experience = ref("");
const stadium = ref("");
const stadiumList = ref(stadiumJSON);
const serviceOptions = ref([]);

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

  await putMethod(
    serverURL,
    `coach/${props.coachID}`,
    coacheInfo,
    $q,
    "Успешно обновлено",
    "Ошибка:",
    params
  );
};

onMounted(() => {
  getAllList();
});
</script>

<style></style>
