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
        label="General information"
      />
      <q-tab
        name="tournaments"
        icon="ion-trophy"
        data-testid="tournamentsTab"
        no-caps
        label="My tournaments"
      />
      <q-tab
        name="settings"
        data-testid="settingsTab"
        icon="ion-settings"
        no-caps
        label="Settings"
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
                label="Edit Information"
                @click="editInformation"
                color="orange-4"
                rounded
              />

              <q-btn
                class="q-mt-sm"
                no-caps
                label="Logout"
                @click="logout"
                color="red-4"
                rounded
              />
            </div>
          </div>
          <div class="col" data-testid="generalInformation">
            <div class="text-h4 q-mb-md">General information</div>
            <p>
              <span class="q-mr-md text-bold">Full name</span
              ><span
                >{{ secondName || "Not found" }}
                {{ firstName || "Not found" }}</span
              >
            </p>
            <p>
              <span class="q-mr-md text-bold">Date of birth</span
              ><span>13.07.2005</span>
            </p>
            <p>
              <span class="q-mr-md text-bold">Gender</span
              ><span :class="[gender === null ? 'text-red' : 'text-black']">
                {{ gender || "Not found" }}
              </span>
            </p>
            <p>
              <span class="q-mr-md text-bold">Phone number</span
              ><span :class="[phone === null ? 'text-red' : 'text-black']">
                {{ phone || "Not found" }}
              </span>
            </p>
            <p>
              <span class="q-mr-md text-bold">Mail</span
              ><span>{{ email }}</span>
            </p>
            <p>
              <span class="q-mr-md text-bold">Rating</span
              ><span :class="[rating === null ? 'text-red' : 'text-black']">
                {{ rating || "Not found" }}
              </span>
            </p>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="tournaments">
        <div class="text-h4 q-mb-md">My tournaments</div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
          praesentium cumque magnam odio iure quidem, quod illum numquam
          possimus obcaecati commodi minima assumenda consectetur culpa fuga
          nulla ullam. In, libero.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
          praesentium cumque magnam odio iure quidem, quod illum numquam
          possimus obcaecati commodi minima assumenda consectetur culpa fuga
          nulla ullam. In, libero.
        </p>
      </q-tab-panel>

      <q-tab-panel name="settings">
        <div>
          <q-select
            v-model="language"
            :options="options"
            label="Выберите язык"
            filled
            emit-value
            map-options
          />
          <q-btn
            color="primary"
            icon="check"
            label="OK"
            @click="changeLanguage"
          />
        </div>
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
import { getCurrentInstance, onMounted, ref } from "vue";
import EditGeneralInfo from "./EditGeneralInfo.vue";
import { Cookies } from "quasar";
import { useI18n } from "vue-i18n";
import stadium from "../../composables/stadium.json";
console.log(stadium);

// general variables
const apiStore = useApiStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const mobileWidth = proxy.$mobileWidth;
const { locale } = useI18n();

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
});

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
