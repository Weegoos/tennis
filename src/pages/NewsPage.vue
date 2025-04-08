<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-img
        src="https://cdn.quasar.dev/img/mountains.jpg"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
      />
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const allNews = ref([]);
const getAllNews = async () => {
  try {
    await getMethod(
      serverURL,
      "news/allNews?page=1&size=10",
      allNews,
      $q,
      "Error: "
    );
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAllNews();
});
</script>

<style></style>
