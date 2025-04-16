<template>
  <q-dialog
    v-model="isOpenFindPartnetInformation"
    persistent
    :full-width="$q.screen.width < mobileWidth ? true : false"
  >
    <q-card :style="$q.screen.width < mobileWidth ? '' : 'width: 800px'">
      <q-card-section>
        <section class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="firstName"
              type="text"
              :label="t('firstNameText')"
            />
            <q-input v-model="phone" type="number" :label="t('phoneNumber')" />
            <q-select
              v-model="city"
              :options="cityOptions"
              :label="t('cityText')"
            />
          </div>
          <div class="col">
            <q-input
              v-model="lastName"
              type="text"
              :label="t('lastNameText')"
            />
            <q-input v-model="rating" type="number" :label="t('ratingText')" />
            <q-select
              :options="stadiumList"
              v-model="stadium"
              type="text"
              :label="t('stadiumText')"
            />
          </div>
        </section>
        <q-input v-model="description" type="text" :label="t('description')" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          :label="t('closeButton')"
          color="red-4"
          @click="closeEditPartnerInformationPage"
        />
        <q-btn
          no-caps
          :label="t('findPartnerPage.editPartnerInformation.edit')"
          color="orange-4"
          @click="updatePartnerInfo"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import stadiumOptions from "../../composables/stadium.json";
import { useI18n } from "vue-i18n";
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
const mobileWidth = proxy.$mobileWidth;
const { t } = useI18n();

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
const stadiumList = ref(stadiumOptions);

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
