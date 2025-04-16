<template>
  <div class="q-pa-md">
    <q-card class="my-card q-pa-sm q-ma-sm text-center">
      <q-card-section>
        <div class="text-h5 text-bold">
          {{ t("coachPage.mainText") }}
          <span class="text-deep-purple">
            {{ t("coachPage.mainTextWithAnotherColor") }}</span
          >
        </div>
        <div class="text-body1 q-mt-sm">
          {{ t("coachPage.captionText") }}
        </div>
        <div class="row justify-center q-gutter-sm">
          <q-input
            style="width: 50vw"
            v-model="search"
            type="text"
            :placeholder="t('coachPage.search')"
            class="q-mr-sm"
            dense
          />
          <q-btn
            dense
            class="q-pa-sm"
            color="primary"
            icon="search"
            @click="searchFunction"
          />
          <q-btn
            color="primary"
            icon="mdi-plus"
            no-caps
            :label="t('coachPage.addFormText')"
            @click="addForm"
          />
        </div>
      </q-card-section>
    </q-card>
    <section v-if="coaches.data > []" class="row">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="(items, index) in coaches.data"
        :key="index"
      >
        <q-card data-testid="coachesID" class="my-card q-mt-md q-mx-sm q-pa-sm">
          <q-tooltip>
            {{ t("coachPage.clickToViewDetailedInformation") }}</q-tooltip
          >
          <q-card-section class="q-gutter-md">
            <div class="col-2">
              <q-img
                src="src/assets/coaches/coaches1.jpg"
                :ratio="10 / 7"
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
                {{ items.user.firstName || t("notSpecifiedText") }}
                {{ items.user.lastName || t("notSpecifiedText") }}
              </div>
              <div class="text-subtitle1">
                {{ items.description || t("notSpecifiedText") }}
              </div>
              <section class="row">
                <div class="col">
                  <div class="q-mt-lg">
                    <p class="text-body1">
                      <span class="text-bold">{{ t("ratingText") }}: </span
                      ><span>{{
                        items.user.rating || t("notSpecifiedText")
                      }}</span>
                    </p>
                    <p class="text-body1">
                      <span class="text-bold">{{ t("serviceText") }}: </span
                      ><span>{{
                        items.services[0].serviceName || t("notSpecifiedText")
                      }}</span>
                    </p>
                  </div>
                </div>
                <div class="col">
                  <div class="q-mt-lg">
                    <p class="text-body1">
                      <span class="text-bold">{{ t("experienceText") }}: </span
                      ><span>{{ items.experience || "Not specified" }}</span>
                    </p>
                    <p class="text-body1">
                      <span class="text-bold">{{ t("cityText") }}: </span
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
                @click="editCoachInformation(items.id)"
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
      </div>
    </section>
    <section v-else class="text-center text-h5 text-bold">
      There is no announcement about the coaches
    </section>
    <AddFormComponent :openForm="openForm" @closeForm="closeForm" />
    <DetailedInformation
      :openDetailedWindow="openDetailedWindow"
      @closeWindow="closeWindow"
      :coacheInformation="Object(coacheInformation)"
    />
    <EditCoachInformation
      :openCoachEditWindow="openCoachEditWindow"
      :coachID="Number(coachID)"
      @closeEditCoachInformationWindow="closeEditCoachInformationWindow"
    />
    <q-pagination
      v-if="coaches.data > []"
      class="justify-center q-pa-sm"
      v-model="current"
      :min="1"
      :max="maxPage"
      @update:model-value="pagination"
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
import { useI18n } from "vue-i18n";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const humanResources = proxy.$humanResources;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const mobileWidth = proxy.$mobileWidth;
const statusForUser = proxy.$statusForUser;
const $q = useQuasar();
const apiStore = useApiStore();
const { t } = useI18n();

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
    `coach/page?page=${page}&size=${maxNumberOfRequestPerPage}&enabled=${statusForUser}`,
    coaches,
    $q,
    "Ошибка при получении тренеров:"
  );
  console.log(coaches.value);
};

const userInfo = ref([]);
const getUserInformation = async () => {
  await apiStore.getUserProfile();
  userInfo.value = apiStore.userData;
};

watch(
  () => coaches.value,
  (newVal) => {
    if (newVal && newVal.totalCount) {
      maxPage.value = Math.ceil(newVal.totalCount / maxNumberOfRequestPerPage);
    } else {
      maxPage.value = 1;
    }
  }
);

onMounted(() => {
  getAllCoaches(1);
  getUserInformation();
});

const current = ref(1);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  getAllCoaches(current.value);
};

const deleteCoaches = async (id) => {
  deleteMethod(serverURL, "coach", id, "Успешно удален");
};

const openCoachEditWindow = ref(false);
const coachID = ref("");
const editCoachInformation = async (id) => {
  openCoachEditWindow.value = true;
  coachID.value = id;
  console.log(typeof coachID.value);
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
