<template>
  <div>
    <q-dialog v-model="editPage" persistent>
      <q-card>
        <q-card-section class="items-center" style="width: 300px">
          <p class="text-h5 text-bold text-center">Editing</p>
          <q-select v-model="gender" :options="genderList" label="Gender" />
          <q-input v-model="firstName" type="text" label="First name" />
          <q-input v-model="lastName" type="text" label="Last name" />
          <q-input v-model="phone" type="text" label="Phone" />
          <q-input v-model="rating" type="number" label="Rating" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            no-caps
            flat
            label="Close"
            color="negative"
            @click="closeOpenPage"
          />
          <q-btn
            color="positive"
            no-caps
            label="Update"
            @click="updateInformation"
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

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();

const props = defineProps({
  openEditPage: {
    type: Boolean,
    required: true,
  },
});

const editPage = ref(props.openEditPage);
watch(
  () => props.openEditPage,
  (newVal) => {
    editPage.value = newVal;
  }
);

const emit = defineEmits(["closeOpenPage"]);
const closeOpenPage = () => {
  emit("closeOpenPage");
};

const gender = ref("");
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const rating = ref("");
const updatedInfo = ref("");
const genderList = ref([]);

const getAllList = async () => {
  try {
    await apiStore.getGender(serverURL, $q);
    genderList.value = apiStore.gender.value;
    console.log(genderList.value);
  } catch (error) {
    console.error(error);
  }
};

const updateInformation = async () => {
  console.log("Updating information...");

  const params = {};

  if (gender.value) params.gender = gender.value;
  if (firstName.value) params.firstName = firstName.value;
  if (lastName.value) params.lastName = lastName.value;
  if (phone.value) params.phone = phone.value;
  if (rating.value) params.rating = rating.value;

  try {
    putMethod(
      serverURL,
      "user/update?",
      updatedInfo,
      $q,
      "Профиль успешно обновлен",
      "Error: ",
      params
    );
  } catch (error) {
    console.error("Error updating information:", error.response?.data || error);
  }
};

onMounted(() => {
  getAllList();
});
</script>

<style></style>
