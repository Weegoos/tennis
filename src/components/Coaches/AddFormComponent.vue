<template>
  <div>
    <q-dialog v-model="form" persistent>
      <q-card style="width: 800px">
        <p class="text-h5 text-bold text-center q-mt-md">Create Coache</p>
        <q-card-section class="row q-gutter-md">
          <section class="col">
            <q-select v-model="city" :options="cityOptions" label="City" />
            <q-select
              v-model="language"
              :options="languageList"
              label="Language"
            />
            <q-input v-model="cost" type="number" label="Cost" />
          </section>
          <section class="col">
            <q-select
              v-model="service"
              :options="serviceOptions"
              label="Service"
            />
            <q-input
              v-model="description"
              type="text"
              autogrow
              label="Description"
            />
            <q-input v-model="experience" type="number" label="Experience" />
          </section>
        </q-card-section>
        <q-card-section>
          <q-select v-model="stadium" :options="stadiumList" label="Stadium" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="negative" @click="closeForm" />
          <q-btn flat label="Send" color="positive" @click="createCoaches" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Cookies, useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";
import stadiumJSON from "../../composables/stadium.json";
console.log(stadiumJSON);
// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const apiStore = useApiStore();

const props = defineProps({
  openForm: {
    type: Boolean,
    required: true,
  },
});

const form = ref(props.openForm);

watch(
  () => props.openForm,
  (newVal) => {
    form.value = newVal;
  }
);

const emit = defineEmits(["closeForm"]);
const closeForm = () => {
  emit("closeForm");
};

const city = ref("");
const language = ref(null);
const cost = ref("");
const service = ref("");
const description = ref("");
const experience = ref("");
const stadium = ref("");
const cityOptions = ref([]);
const languageList = ref([]);
const serviceOptions = ref([]);
const stadiumList = ref(stadiumJSON);

const createCoaches = async () => {
  const payload = {
    city: city.value,
    language: Array.isArray(language.value) ? language.value : [language.value],
    cost: Number(cost.value) || 0,
    service: service.value,
    description: description.value,
    experience: Number(experience.value) || 0,
    stadium: stadium.value,
  };
  postMethod(serverURL, "coach", payload, $q, "Тренер успешно зареган");
};

const getAllList = async () => {
  await apiStore.getCity(serverURL, $q);
  cityOptions.value = apiStore.city.value;

  await apiStore.getLanguage(serverURL, $q);
  languageList.value = apiStore.language.value;

  await apiStore.getService(serverURL, $q);
  serviceOptions.value = apiStore.service.value;

  console.log();
};

onMounted(() => {
  getAllList();
});
</script>

<style></style>
