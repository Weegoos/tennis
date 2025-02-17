<template>
  <div class="fixed-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="startDate" type="text" label="Start date">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDate" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col">
            <q-input v-model="endDate" type="text" label="End date">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="endDate" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input v-model="time" type="text" label="Start time">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="time" mask="HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-gutter-sm q-mt-sm">
          <div class="col">
            <q-select
              v-model="category"
              :options="categoryOptions"
              label="Category"
            />
          </div>
          <div class="col">
            <q-input
              v-model="maxParticipants"
              type="number"
              label="Maximum number of participants"
            />
          </div>
          <div class="col">
            <q-input v-model="location" type="text" label="Location" />
          </div>
          <div class="col">
            <q-input v-model="city" type="text" label="City" />
          </div>
        </div>

        <div class="row q-gutter-sm q-mt-sm">
          <div class="col">
            <q-input v-model="minLevel" type="number" label="Minimum level" />
          </div>
          <div class="col">
            <q-input v-model="maxLevel" type="number" label="Maximum level" />
          </div>
          <div class="col">
            <q-input v-model="cost" type="number" label="Cost" />
          </div>
        </div>
        <div class="row q-gutter-sm q-mt-sm">
          <div class="col">
            <q-input
              v-model="description"
              type="text"
              label="Description"
              autogrow
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn no-caps color="green-4" label="Create" @click="createEvent" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { Cookies, useQuasar } from "quasar";
import axios from "axios";
import { getCurrentInstance, ref } from "vue";

// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

const startDate = ref("");
const endDate = ref("");
const time = ref("");
const category = ref("");
const location = ref("");
const city = ref("");
const cost = ref("");
const description = ref("");
const maxParticipants = ref("");
const minLevel = ref("");
const maxLevel = ref("");

const categoryOptions = ref(["SINGLES_FEMALE"]);

const createEvent = async () => {
  try {
    const payload = {
      description: description.value,
      startDate: startDate.value,
      endDate: endDate.value,
      startTime: time.value,
      category: category.value,
      maxParticipants: Number(maxParticipants.value) || 0,
      location: location.value,
      city: city.value,
      minLevel: Number(minLevel.value) || 0,
      maxLevel: Number(maxLevel.value) || 0,
      cost: Number(cost.value) || 0,
    };

    const response = await axios.post(`${serverURL}tournament`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    $q.notify({
      type: "positive",
      message: "Событие успешно создано!",
    });

    console.log("Ответ сервера:", response.data);
  } catch (error) {
    console.error("Ошибка:", error.response?.data);

    $q.notify({
      type: "negative",
      message: "Ошибка при создании события",
    });
  }
};
</script>

<style></style>
