<template>
  <div>
    <div class="card">
      <p class="text-h4 text-bold">Coaches</p>
      <q-btn color="primary" label="Add a form" @click="addForm" />
    </div>
    <section v-if="coaches.content > []">
      <q-card
        data-testid="coachesID"
        class="card"
        v-for="(items, index) in coaches.content"
        :key="index"
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
          <section
            class="col-8"
            @click="viewDetailedInformationAboutCoache(items)"
          >
            <div class="text-h4 text-bold">
              {{ items.user.firstName || "Not specified" }}
              {{ items.user.lastName || "Not specified" }}
            </div>
            <div class="text-subtitle1">
              {{ items.description || "Not specified" }}
            </div>
            <section class="row">
              <div class="col">
                <div class="q-mt-lg">
                  <p class="text-body1">
                    <span class="text-bold">Service: </span
                    ><span>{{ items.service || "Not specified" }}</span>
                  </p>
                  <p class="text-body1">
                    <span class="text-bold">Experience: </span
                    ><span>{{ items.experience || "Not specified" }}</span>
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="q-mt-lg">
                  <p class="text-body1">
                    <span class="text-bold">Rating: </span
                    ><span>{{ items.user.rating || "Not specified" }}</span>
                  </p>
                  <p class="text-body1">
                    <span class="text-bold">City: </span
                    ><span>{{ items.city }}</span>
                  </p>
                </div>
              </div>
            </section>
          </section>
          <div
            class="col"
            v-if="userInfo.role == humanResources"
            align="right"
            data-testid="buttonSection"
          >
            <q-btn
              flat
              color="black"
              icon="edit"
              @click="editCoachInformation"
            />
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
    <section v-else class="text-center text-h5 text-bold">
      There is no announcement about the coaches
    </section>
    <AddFormComponent :openForm="openForm" @closeForm="closeForm" />
    <DetailedInformation
      :openDetailedWindow="openDetailedWindow"
      @closeWindow="closeWindow"
      :coacheInformation="coacheInformation"
    />
    <q-pagination
      class="justify-center"
      v-model="current"
      :min="0"
      :max="maxPage"
      @update:model-value="pagination"
    />
    <EditCoachInformation
      :openCoachEditWindow="openCoachEditWindow"
      @closeEditCoachInformationWindow="closeEditCoachInformationWindow"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import AddFormComponent from "src/components/Coaches/AddFormComponent.vue";
import { useQuasar } from "quasar";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";
import DetailedInformation from "src/components/Coaches/DetailedInformation.vue";
import { useApiStore } from "src/stores/api-store";
import EditCoachInformation from "src/components/Coaches/EditCoachInformation.vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const humanResources = proxy.$humanResources;
const $q = useQuasar();
const apiStore = useApiStore();

const openForm = ref(false);
const addForm = () => {
  openForm.value = true;
};

const closeForm = () => {
  openForm.value = false;
};

const openDetailedWindow = ref(false);
const coacheInformation = ref("");
const viewDetailedInformationAboutCoache = (info) => {
  openDetailedWindow.value = true;
  coacheInformation.value = info;
  console.log(userInfo);
};

const closeWindow = () => {
  openDetailedWindow.value = false;
};

const coaches = ref("");
const maxPage = ref("");
const getAllCoaches = async (page) => {
  await getMethod(
    serverURL,
    `coach/page?page=${page}`,
    coaches,
    $q,
    "Ошибка при получении тренеров:"
  );
};

const userInfo = ref([]);
const getUserInformation = async () => {
  await apiStore.getUserProfile();
  userInfo.value = apiStore.userData;
};

watch(
  () => coaches.value,
  (newVal) => {
    maxPage.value = newVal.totalPages - 1;
  }
);

onMounted(() => {
  getAllCoaches(0);
  getUserInformation();
});

const current = ref(0);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  getAllCoaches(current.value);
};

const deleteCoaches = async (id) => {
  deleteMethod(serverURL, "coach", id, "Успешно удален");
};

const openCoachEditWindow = ref(false);
const editCoachInformation = async () => {
  openCoachEditWindow.value = true;
};

const closeEditCoachInformationWindow = () => {
  openCoachEditWindow.value = false;
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
