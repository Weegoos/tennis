<template>
  <div>
    <q-dialog v-model="form" persistent>
      <q-card style="width: 800px">
        <p class="text-h5 text-bold text-center q-mt-md">Coach's profile</p>
        <q-card-section class="row q-gutter-md">
          <section class="col">
            <q-input v-model="city" type="text" label="City" />
            <q-input v-model="language" type="text" label="Language" />
            <q-input v-model="cost" type="number" label="Cost" />
          </section>
          <section class="col">
            <q-input v-model="service" type="text" label="Service" />
            <q-input v-model="description" type="text" label="Description" />
            <q-input v-model="experience" type="number" label="Experience" />
          </section>
        </q-card-section>
        <q-card-section>
          <q-input v-model="stadium" type="text" label="Stadium" />
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
import axios from "axios";
import { getCurrentInstance, ref, watch } from "vue";

// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

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
const language = ref("");
const cost = ref("");
const service = ref("");
const description = ref("");
const experience = ref("");
const stadium = ref("");

const createCoaches = async () => {
  try {
    const payload = {
      city: city.value,
      language: language.value,
      cost: Number(cost.value) || 0,
      service: service.value,
      description: description.value,
      experience: Number(experience.value) || 0,
      stadium: stadium.value,
    };

    const response = await axios.post(`${serverURL}coach`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    $q.notify({
      type: "positive",
      message: "Тренер успешно зарегестрирован!",
    });

    console.log("Ответ сервера:", response.data);
  } catch (error) {
    console.error("Ошибка:", error.response?.data);

    $q.notify({
      type: "negative",
      message: "Ошибка при создании тренера",
    });
  }
};
</script>

<style></style>
