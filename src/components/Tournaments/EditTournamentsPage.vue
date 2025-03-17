<template>
  <div>
    <q-dialog v-model="isEditTournament" persistent full-width>
      <q-card>
        <p class="text-center text-width-thin text-h4 q-mt-md">Edit</p>
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
              <q-input v-model="startTime" type="text" label="Start time">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="startTime" mask="HH:mm" format24h>
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
              <q-input
                v-model="city"
                type="text"
                label="City"
                list="cityList"
              />

              <datalist id="cityList">
                <section v-for="(city, id) in cityOptions" :key="id">
                  <option :value="city"></option>
                </section>
              </datalist>
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
          <q-btn
            flat
            label="Close"
            color="red-4"
            @click="closeEditTournament"
          />
          <q-btn flat label="Update" color="green-4" @click="updateEvent" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { putMethod } from "src/composables/apiMethod/put";
import { useApiStore } from "src/stores/api-store";
import { patchMethod } from "src/composables/apiMethod/patch";

// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const props = defineProps({
  openEditTournamentComponent: {
    type: Boolean,
    required: true,
  },
  tournamentID: {
    type: Number,
    required: true,
  },
});
const apiStore = useApiStore();

const startDate = ref("");
const endDate = ref("");
const startTime = ref("");
const category = ref("");
const location = ref("");
const city = ref("");
const cost = ref("");
const description = ref("");
const maxParticipants = ref("");
const minLevel = ref("");
const maxLevel = ref("");

const categoryOptions = ref([]);
const cityOptions = ref([]);

const setList = async () => {
  await apiStore.getCity(serverURL, $q);
  cityOptions.value = apiStore.city.value;

  await apiStore.getCategory(serverURL, $q);
  categoryOptions.value = apiStore.category.value;
};

const isEditTournament = ref(props.openEditTournamentComponent);

watch(
  () => props.openEditTournamentComponent,
  (newVal) => {
    isEditTournament.value = newVal;
  }
);

const emit = defineEmits(["closeEditTournament"]);
const closeEditTournament = () => {
  emit("closeEditTournament");
};

const updateEventInfo = ref("");
const updateEvent = async () => {
  const params = {};
  if (description.value) params.description = description.value;
  if (startDate.value) params.startDate = startDate.value;
  if (endDate.value) params.endDate = endDate.value;
  if (startTime.value) params.startTime = startTime.value;
  if (category.value) params.category = category.value;
  if (maxParticipants.value) params.maxParticipants = maxParticipants.value;
  if (location.value) params.location = location.value;
  if (city.value) params.city = city.value;
  if (minLevel.value) params.minLevel = minLevel.value;
  if (maxLevel.value) params.maxLevel = maxLevel.value;
  if (cost.value) params.cost = cost.value;

  patchMethod(
    serverURL,
    "tournament",
    props.tournamentID,
    updateEventInfo.value,
    $q,
    "Турнир успешно изменен",
    "Ошибка при создании турнира",
    params
  );
};

onMounted(() => {
  setList();
});
</script>

<style></style>
