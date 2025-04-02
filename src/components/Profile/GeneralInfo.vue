<template>
  <div :class="$q.screen.width < mobileWidth ? 'q-pa-md' : 'q-pa-xl'">
    <q-tabs v-model="tab" class="text-teal">
      <q-tab
        name="info"
        icon="ion-person"
        no-caps
        label="General information"
      />
      <q-tab
        name="tournaments"
        icon="ion-trophy"
        no-caps
        label="My tournaments"
      />
      <q-tab
        name="reservations"
        icon="ion-calendar"
        no-caps
        label="My reservations"
      />
    </q-tabs>

    <q-tab-panels
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
          <div class="col">
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

      <q-tab-panel name="reservations">
        <div class="text-h4 q-mb-md">My reservations</div>
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
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
          praesentium cumque magnam odio iure quidem, quod illum numquam
          possimus obcaecati commodi minima assumenda consectetur culpa fuga
          nulla ullam. In, libero.
        </p>
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

// general variables
const apiStore = useApiStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const mobileWidth = proxy.$mobileWidth;

const tab = ref("info");

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
  console.log(user.userInfo);
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
