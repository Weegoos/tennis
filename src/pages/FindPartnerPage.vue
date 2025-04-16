<template>
  <div class="q-pa-md">
    <q-card class="my-card q-pa-sm q-ma-sm text-center">
      <q-card-section>
        <div class="text-h5 text-bold">
          {{ t("findPartnerPage.mainText") }}
          <span class="text-light-green">{{
            t("findPartnerPage.mainTextWithAnotherColor")
          }}</span>
        </div>
        <div class="text-body1 q-mt-sm">
          {{ t("findPartnerPage.captionText") }}
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
            no-caps
            icon="mdi-plus"
            :label="t('findPartnerPage.sendRequest')"
            @click="sendRequest"
          />
        </div>
      </q-card-section>
    </q-card>

    <section class="row" v-if="partner.data > []">
      <section
        data-testid="partnerDataTestID"
        class="col-12 col-sm-6 col-md-4"
        v-for="(items, index) in partner.data"
        :key="index"
      >
        <q-card data-testid="partnerID" class="my-card q-mt-md q-mx-sm q-pa-sm">
          <q-tooltip> {{ t("findPartnerPage.detailedInformation") }}</q-tooltip>
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
                {{ items.firstName || t("notSpecifiedText") }}
                {{ items.lastName || t("notSpecifiedText") }}
              </div>
              <div class="text-subtitle1">
                {{ items.description || t("notSpecifiedText") }}
              </div>
              <section class="row">
                <div class="col">
                  <div class="q-mt-lg">
                    <p class="text-body1">
                      <span class="text-bold">{{ t("phoneNumber") }}: </span
                      ><span>{{ items.phone || t("notSpecifiedText") }}</span>
                    </p>
                    <p class="text-body1">
                      <span class="text-bold">{{ t("cityText") }}: </span
                      ><span>{{ items.city || t("notSpecifiedText") }}</span>
                    </p>
                  </div>
                </div>
                <div class="col">
                  <div class="q-mt-lg">
                    <p class="text-body1">
                      <span class="text-bold">{{ t("ratingText") }}: </span
                      ><span>{{ items.rating || t("notSpecifiedText") }}</span>
                    </p>
                    <p class="text-body1">
                      <span class="text-bold">{{ t("stadiumText") }}: </span
                      ><span>{{ items.stadium || t("notSpecifiedText") }}</span>
                    </p>
                  </div>
                </div>
              </section>
            </section>

            <div
              v-if="userInfo.role === humanResources"
              class="col"
              align="right"
              data-testid="buttonSection"
            >
              <q-btn
                flat
                color="black"
                icon="edit"
                @click="editCoaches(items.id)"
              />
              <q-btn
                flat
                color="red-4"
                icon="delete"
                @click="deletePartner(items.id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </section>
    </section>
    <section
      data-testid="partnerNoData"
      v-else
      class="text-center text-h5 text-bold"
    >
      There is no announcement about the coaches
    </section>
    <PostRequest
      :openPostRequestWindow="openPostRequestWindow"
      @closePostRequestWindow="closePostRequestWindow"
    />
    <q-pagination
      v-if="partner.data > []"
      class="justify-center"
      v-model="current"
      :min="1"
      :max="maxPage"
      @update:model-value="pagination"
    />
    <EditPartnerInformation
      :openEditPartnerInformationWindow="openEditPartnerInformationWindow"
      @closeEditPartnerInformationPage="closeEditPartnerInformationPage"
      :partnerId="Number(partnerId)"
    />
    <DetailedInformation
      :openDetailedWindow="openDetailedWindow"
      :fullInformationAboutPartner="Object(fullInformationAboutPartner)"
      @closeWindow="closeWindow"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import DetailedInformation from "src/components/FindPartner/DetailedInformation.vue";
import EditPartnerInformation from "src/components/FindPartner/EditPartnerInformation.vue";
import PostRequest from "src/components/Partner/PostRequest.vue";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const humanResources = proxy.$humanResources;
const mobileWidth = proxy.$mobileWidth;
const apiStore = useApiStore();
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const statusForUser = proxy.$statusForUser;
const $q = useQuasar();
const { t } = useI18n();

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
  try {
    await getMethod(
      serverURL,
      `partner/page?page=${page}&size=${maxNumberOfRequestPerPage}&enabled=${statusForUser}`,
      partner,
      $q,
      "Ошибка при получении партнеров:"
    );
    console.log(partner.value);
  } catch (error) {
    console.log(error);
  }
};

const deletePartner = async (id) => {
  await deleteMethod(serverURL, "partner", id);
};

const userInfo = ref([]);
const getInformationAboutUser = async () => {
  await apiStore.getUserProfile();
  userInfo.value = apiStore.userData;
};

watch(
  () => partner.value,
  (newVal) => {
    if (newVal && newVal.totalCount) {
      maxPage.value = Math.ceil(newVal.totalCount / maxNumberOfRequestPerPage);
    } else {
      maxPage.value = 1;
    }
  }
);

onMounted(() => {
  getPartner(1);
  getInformationAboutUser();
});

const current = ref(1);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  getPartner(current.value);
};

const openDetailedWindow = ref(false);
const fullInformationAboutPartner = ref("");
const viewDetailedInformationAboutCoache = (partnerInfo) => {
  openDetailedWindow.value = true;
  fullInformationAboutPartner.value = partnerInfo;
};

const closeWindow = () => {
  openDetailedWindow.value = false;
};

const openEditPartnerInformationWindow = ref(false);
const partnerId = ref("");
const editCoaches = (id) => {
  openEditPartnerInformationWindow.value = true;
  partnerId.value = id;
};

const closeEditPartnerInformationPage = () => {
  openEditPartnerInformationWindow.value = false;
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
