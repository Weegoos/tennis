<template>
  <q-dialog v-model="isOpenFindPartnetInformation" persistent>
    <q-card>
      <q-card-section class="row q-gutter-sm">
        <q-input v-model="firstName" type="text" label="First Name" />
        <q-input v-model="lastName" type="text" label="Last Name" />
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
import { getCurrentInstance, ref, watch } from "vue";

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

const partnerInfo = ref("");
const updatePartnerInfo = async () => {
  const params = {};
  if (firstName.value) params.firstName = city.firstName;
  if (lastName.value) params.lastName = lastName.value;
  console.log(props.partnerId);

  await putMethod(
    serverURL,
    `partner`,
    `${props.partnerId}`,
    partnerInfo,
    $q,
    "Успешно обновлено",
    "Ошибка:",
    params
  );
};
</script>

<style></style>
