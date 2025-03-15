<template>
  <div>
    <q-dialog v-model="isPostRequestForm" persistent>
      <q-card style="width: 800px">
        <q-card-section>
          <div class="row q-gutter-md">
            <section class="col">
              <q-input v-model="firstName" type="text" label="First name" />
              <q-select v-model="city" :options="cityOptions" label="City" />
              <q-input v-model="phone" type="number" label="Phone" />
            </section>
            <section class="col">
              <q-input v-model="lastName" type="text" label="Last name" />
              <q-input v-model="rating" type="number" label="Rating" />
              <q-input v-model="stadium" type="text" label="Stadium" />
            </section>
          </div>
          <section>
            <q-input
              v-model="description"
              autogrow
              type="text"
              label="Description"
            />
          </section>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Post" color="positive" @click="postRequest" />
          <q-btn
            flat
            label="Close"
            color="red-4"
            @click="closePostRequestWindow"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const props = defineProps({
  openPostRequestWindow: {
    type: Boolean,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();

const isPostRequestForm = ref(props.openPostRequestWindow);

watch(
  () => props.openPostRequestWindow,
  (newVal) => {
    isPostRequestForm.value = newVal;
  }
);

const emit = defineEmits(["closePostRequestWindow"]);
const closePostRequestWindow = () => {
  emit("closePostRequestWindow");
};

const phone = ref("");
const firstName = ref("");
const lastName = ref("");
const rating = ref("");
const city = ref("");
const stadium = ref("");
const description = ref("");
const cityOptions = ref([]);

const postRequest = async () => {
  const payload = {
    phone: phone.value,
    firstName: firstName.value,
    lastName: lastName.value,
    rating: Number(rating.value),
    city: city.value,
    stadium: stadium.value,
    description: description.value,
  };
  await postMethod(serverURL, "partner", payload, $q, "Партнер добавлен!");
};

const getCity = async () => {
  await apiStore.getCity(serverURL, $q);
  cityOptions.value = apiStore.city.value;
};

onMounted(() => {
  getCity();
});
</script>

<style></style>
