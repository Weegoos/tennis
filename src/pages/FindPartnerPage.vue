<template>
  <div>
    <div class="card">
      <p class="text-h4 text-bold">Find a partner</p>
      <q-btn color="primary" label="Place a request" @click="sendRequest" />
    </div>
    <section>
      <section v-if="partner.content > []">
        <q-card
          data-testid="coachesID"
          class="card"
          v-for="(items, index) in partner.content"
          :key="index"
          @click="viewDetailedInformationAboutCoache(items)"
        >
          <q-tooltip>
            Click here to view detailed information about the coach</q-tooltip
          >
          <q-card-section class="row q-gutter-md">
            <div class="col-2">
              <q-img
                src="src/assets/coaches/coaches1.jpg"
                :ratio="10 / 9"
                spinner-color="primary"
                spinner-size="82px"
                class="full-height"
              />
            </div>
            <section class="col">
              <div class="text-h4 text-bold">
                {{ items.firstName || "Not specified" }}
                {{ items.lastName || "Not specified" }}
              </div>
              <div class="text-subtitle1">
                {{ items.description || "Not specified" }}
              </div>
              <section class="row">
                <div class="col">
                  <div class="q-mt-lg">
                    <p class="text-body1">
                      <span class="text-bold">Phone: </span
                      ><span>{{ items.phone || "Not specified" }}</span>
                    </p>
                    <p class="text-body1">
                      <span class="text-bold">City: </span
                      ><span>{{ items.city || "Not specified" }}</span>
                    </p>
                  </div>
                </div>
                <div class="col">
                  <div class="q-mt-lg">
                    <p class="text-body1">
                      <span class="text-bold">Rating: </span
                      ><span>{{ items.rating || "Not specified" }}</span>
                    </p>
                    <p class="text-body1">
                      <span class="text-bold">Stadium: </span
                      ><span>{{ items.stadium }}</span>
                    </p>
                  </div>
                </div>
              </section>
            </section>
            <div class="col" align="right" data-testid="buttonSection">
              <q-btn flat color="black" icon="edit" @click="editCoaches" />
              <q-btn
                flat
                color="red-4"
                icon="delete"
                @click="deleteCoaches(items.id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </section>
    </section>
    <PostRequest
      :openPostRequestWindow="openPostRequestWindow"
      @closePostRequestWindow="closePostRequestWindow"
    />
    <q-pagination
      class="justify-center"
      v-model="current"
      :min="0"
      :max="maxPage"
      @update:model-value="pagination"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import PostRequest from "src/components/Partner/PostRequest.vue";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const openPostRequestWindow = ref(false);
const sendRequest = () => {
  openPostRequestWindow.value = true;
};

const closePostRequestWindow = () => {
  openPostRequestWindow.value = false;
};

const partner = ref("");
const maxPage = ref("");
const getPartner = async (page) => {
  await getMethod(
    serverURL,
    `partner/page?page=${page}`,
    partner,
    $q,
    "Ошибка при получении партнеров:"
  );
};

watch(
  () => partner.value,
  (newVal) => {
    maxPage.value = newVal.totalPages - 1;
  }
);

onMounted(() => {
  getPartner(0);
});

const current = ref(0);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  getPartner(current.value);
};
</script>

<style scoped>
.card {
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
