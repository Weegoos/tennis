<template>
  <div
    data-testid="wrapperDiv"
    :class="$q.screen.width < mobileWidth ? 'q-pa-md' : 'q-pa-xl'"
  >
    <q-tabs v-model="tab" class="text-teal" data-testid="wrapperTabs">
      <q-tab
        name="info"
        icon="ion-person"
        data-testid="infoTab"
        no-caps
        :label="t('editPage.tabs.generalInfo')"
      />
      <q-tab
        name="tournaments"
        icon="ion-trophy"
        data-testid="tournamentsTab"
        no-caps
        :label="t('editPage.tabs.myTournaments')"
      />
    </q-tabs>

    <q-tab-panels
      data-testid="animatedPanels"
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="info">
        <div
          class="q-gutter-lg"
          :class="$q.screen.width < mobileWidth ? 'col' : 'row'"
        >
          <div class="col-3">
            <q-img
              src="../../assets/coaches/coaches1.jpg"
              :ratio="10 / 8"
              spinner-color="primary"
              spinner-size="82px"
            />

            <div class="col" align="center">
              <q-btn
                class="q-mt-sm q-mr-sm"
                no-caps
                :label="t('editPage.editInformationButton')"
                @click="editInformation"
                color="orange-4"
                rounded
              />

              <q-btn
                class="q-mt-sm"
                no-caps
                :label="t('editPage.logoutButton')"
                @click="logout"
                color="red-4"
                rounded
              />
            </div>
          </div>
          <div class="col" data-testid="generalInformation">
            <div class="text-h4 q-mb-md">
              {{ t("editPage.tabs.generalInfo") }}
            </div>
            <p>
              <span class="q-mr-md text-bold">{{ t("fullNameText") }}</span
              ><span
                >{{ secondName || t("notSpecifiedText") }}
                {{ firstName || t("notSpecifiedText") }}</span
              >
            </p>
            <p>
              <span class="q-mr-md text-bold"
                >{{ t("editPage.dateOfBirth") }}: </span
              ><span>13.07.2005</span>
            </p>
            <p>
              <span class="q-mr-md text-bold">{{ t("genderText") }}: </span
              ><span :class="[gender === null ? 'text-red' : 'text-black']">
                {{ gender || t("notSpecifiedText") }}
              </span>
            </p>
            <p>
              <span class="q-mr-md text-bold">{{ t("phoneNumber") }}: </span
              ><span :class="[phone === null ? 'text-red' : 'text-black']">
                {{ phone || t("notSpecifiedText") }}
              </span>
            </p>
            <p>
              <span class="q-mr-md text-bold">{{ t("emailText") }}: </span
              ><span>{{ email }}</span>
            </p>
            <p>
              <span class="q-mr-md text-bold">{{ t("ratingText") }}: </span
              ><span :class="[rating === null ? 'text-red' : 'text-black']">
                {{ rating || t("notSpecifiedText") }}
              </span>
            </p>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="tournaments">
        <div v-if="allInvitations && allInvitations?.length">
          <q-table
            flat
            bordered
            :title="t('editPage.invitationsText')"
            :rows="allInvitations"
            :columns="columns"
            row-key="name"
            hide-bottom
          >
            <template v-slot:body-cell-accept="props">
              <q-td align="center">
                <q-btn
                  color="primary"
                  icon="mdi-thumb-up"
                  size="sm"
                  @click="acceptInvitation(props.row)"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-reject="props">
              <q-td align="center">
                <q-btn
                  color="primary"
                  icon="mdi-thumb-down"
                  size="sm"
                  @click="rejectInvitation(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
        <div v-else>{{ t("editPage.noData") }}</div>
      </q-tab-panel>
    </q-tab-panels>

    <EditGeneralInfo
      :openEditPage="openEditPage"
      @closeOpenPage="closeOpenPage"
    />
  </div>
</template>

<script setup>
import { useApiStore } from "src/stores/api-store";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import EditGeneralInfo from "./EditGeneralInfo.vue";
import { Cookies, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { getMethod } from "src/composables/apiMethod/get";
import { putMethod } from "src/composables/apiMethod/put";

// global variables
const apiStore = useApiStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const mobileWidth = proxy.$mobileWidth;
const { locale } = useI18n();
const $q = useQuasar();
const { t } = useI18n();

const tab = ref("info");
const language = ref(locale.value);
const options = [
  { label: "Русский", value: "ru-RU" },
  { label: "English", value: "en-US" },
  { label: "Қазақша", value: "kz-KZ" },
  { label: "Deutsch", value: "de-DU" },
];

const changeLanguage = () => {
  locale.value = language.value;
  localStorage.setItem("locale", language.value);
};

const columns = computed(() => [
  {
    name: "id",
    required: true,
    label: "№",
    align: "left",
    field: (user) => user.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "partner",
    required: true,
    label: t("profile.partnerText"),
    align: "left",
    field: (user) => user.user.email,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "tournament",
    required: true,
    label: t("profile.tournamentText"),
    align: "left",
    field: (user) => user.tournament.description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    required: true,
    label: t("profile.categoryText"),
    align: "left",
    field: (user) => user.tournament.category,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: t("profile.statusText"),
    align: "left",
    field: (user) => user.status,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "accept",
    label: t("profile.acceptButton"),
    align: "center",
    field: "id",
  },
  {
    name: "reject",
    label: t("profile.rejectButton"),
    align: "center",
    field: "id",
  },
]);

const allInvitations = ref([]);
const getInvitations = async () => {
  try {
    await getMethod(
      serverURL,
      "user/invintations",
      allInvitations,
      $q,
      "Error: "
    );
    console.log(allInvitations.value);
  } catch (error) {
    console.error(error);
  }
};

const firstName = ref("");
const secondName = ref("");
const phone = ref("");
const email = ref("");
const gender = ref("");
const rating = ref("");

onMounted(async () => {
  await apiStore.getUserProfile();
  const user = apiStore.userData;
  email.value = user.email;
  firstName.value = user.userInfo.firstName;
  secondName.value = user.userInfo.lastName;
  gender.value = user.userInfo.gender;
  phone.value = user.userInfo.phone;
  rating.value = user.userInfo.rating;
  getInvitations();
});

const acceptVar = ref("");
const acceptInvitation = async (row) => {
  console.log(row.id);
  console.log(row.user.id);
  try {
    await putMethod(
      serverURL,
      `registration/${row.id}/confirm?partnerId=${row.user.id}`,
      acceptVar,
      $q,
      "Приглашение успешно принято!",
      "Ошибка при принятии приглашение: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const rejectInvitation = async (row) => {
  console.log(row.id);
  console.log(row.user.id);
  try {
    await putMethod(
      serverURL,
      `registration/${row.id}/reject?partnerId=${row.user.id}`,
      acceptVar,
      $q,
      "Приглашение успешно принято!",
      "Ошибка при принятии приглашение: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const openEditPage = ref(false);
const editInformation = () => {
  openEditPage.value = true;
};

const closeOpenPage = () => {
  openEditPage.value = false;
};

const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.reload();
};
</script>

<style></style>
