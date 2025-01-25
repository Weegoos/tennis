<template>
  <div class="q-pa-xl">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
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
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="info">
            <div class="row q-gutter-lg">
              <div class="col-4">
                <q-img
                  src="../../assets/background.jpg"
                  :ratio="16 / 9"
                  spinner-color="primary"
                  spinner-size="82px"
                />
                <q-btn
                  class="q-mt-sm"
                  no-caps
                  label="Edit Information"
                  @click="editInformation"
                />
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
      </template>
    </q-splitter>
    <EditGeneralInfo
      :openEditPage="openEditPage"
      @closeOpenPage="closeOpenPage"
    />
  </div>
</template>

<script setup>
import { useApiStore } from "src/stores/api-store";
import { onMounted, ref } from "vue";
import EditGeneralInfo from "./EditGeneralInfo.vue";

// general variables
const apiStore = useApiStore();

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

  // phone.value = user.
});

const openEditPage = ref(false);
const editInformation = () => {
  openEditPage.value = true;
};

const closeOpenPage = () => {
  openEditPage.value = false;
};
</script>

<style></style>
