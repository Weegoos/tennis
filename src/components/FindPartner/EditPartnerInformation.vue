<template>
  <q-dialog v-model="isOpenFindPartnetInformation" persistent>
    <q-card>
      <q-card-section class="">
        <section class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="firstName" type="text" label="First Name" />
            <q-input v-model="phone" type="number" label="Phone" />
            <q-select v-model="city" :options="cityOptions" label="City" />
          </div>
          <div class="col">
            <q-input v-model="lastName" type="text" label="Last Name" />
            <q-input v-model="rating" type="number" label="Rating" />
            <q-input v-model="stadium" type="text" label="Stadium" />
          </div>
        </section>
        <q-input v-model="description" type="text" label="Description" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Close"
          color="red-4"
          @click="closeEditPartnerInformationPage"
        />
        <q-btn label="Edit" color="orange-4" @click="updatePartnerInfo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const props = defineProps({
  openEditPartnerInformationWindow: {
    type: Boolean,
    required: true,
  },
  partnerId: {
    type: Number,
    required: true,
  },
});
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const apiStore = useApiStore();

const isOpenFindPartnetInformation = ref(
  props.openEditPartnerInformationWindow
);

watch(
  () => props.openEditPartnerInformationWindow,
  (newVal) => {
    isOpenFindPartnetInformation.value = newVal;
  }
);

const emit = defineEmits(["closeEditPartnerInformationPage"]);
const closeEditPartnerInformationPage = () => {
  emit("closeEditPartnerInformationPage");
};

const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const rating = ref("");
const city = ref("");
const stadium = ref("");
const description = ref("");
const cityOptions = ref([]);

const getAllList = async () => {
  try {
    await apiStore.getCity(serverURL, $q);
    cityOptions.value = apiStore.city.value;
  } catch (error) {
    console.error(error);
  }
};

const partnerInfo = ref("");
const updatePartnerInfo = async () => {
  const params = {};
  if (firstName.value) params.firstName = city.value.firstName;
  if (lastName.value) params.lastName = lastName.value;
  if (phone.value) params.phone = phone.value;
  if (rating.value) params.rating = rating.value;
  if (city.value) params.city = city.value;
  if (stadium.value) params.stadium = stadium.value;
  if (description.value) params.description = description.value;

  await putMethod(
    serverURL,
    `partner/${props.partnerId}`,
    partnerInfo,
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
