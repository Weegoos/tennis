<template>
  <div class="q-pa-sm">
    <q-card class="my-card q-mb-md">
      <div :class="$q.screen.width < mobileWidth ? 'col' : 'row'">
        <section class="col-2">
          <q-img
            src="https://cdn.quasar.dev/img/mountains.jpg"
            :ratio="16 / 12"
            spinner-color="primary"
            spinner-size="82px"
            class="full-height"
          />
        </section>
        <section class="col">
          <q-card-section class="row">
            <div class="text-capitalize col">
              <p class="text-weight-thin text-body1">
                {{ t("tournamentPage.internationalTournamentsText") }}
              </p>
              <p class="text-h4">{{ description }}</p>
              <p class="text-subtitle1">{{ category }}</p>
              <p class="">
                {{ t("tournamentPage.fromText") }} {{ startDate }}
                {{ t("tournamentPage.toText") }} {{ endDate }}
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <div>{{ location }}, {{ city }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="black"
              class="q-pa-md"
              no-caps
              rounded
              :class="$q.screen.width < mobileWidth ? 'buttonMobile' : 'button'"
              :label="t('tournamentPage.mainPage.exploreButton')"
              @click="exploreTournaments(tournament)"
            />
          </q-card-actions>
        </section>
      </div>
    </q-card>
    <q-card class="create">
      <q-card-section>
        <div
          class="q-gutter-sm"
          :class="$q.screen.width < mobileWidth ? 'col' : 'row'"
        >
          <div class="col">
            <q-input
              v-model="startDate"
              type="text"
              :label="t('tournamentPage.editPage.startDateText')"
            >
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
            <q-input
              v-model="endDate"
              type="text"
              :label="t('tournamentPage.editPage.endDateText')"
            >
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
            <q-input
              v-model="time"
              type="text"
              :label="t('tournamentPage.editPage.startTimeText')"
            >
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
              :label="t('tournamentPage.editPage.categoryText')"
            />
          </div>
          <div class="col">
            <q-select v-model="tier" :options="tierOptions" label="Tier" />
          </div>
          <div class="col">
            <q-select
              v-model="location"
              :options="locationOptions"
              :label="t('tournamentPage.editPage.locationText')"
            />
          </div>
          <div class="col">
            <q-input
              v-model="city"
              type="text"
              :label="t('cityText')"
              list="city"
            />
            <datalist id="city">
              <section v-for="(cities, id) in cities" :key="id">
                <option :value="cities"></option>
              </section>
            </datalist>
          </div>
        </div>

        <div class="row q-gutter-sm q-mt-sm">
          <div class="col">
            <q-input
              v-model="minLevel"
              type="number"
              :label="t('tournamentPage.editPage.minLevelText')"
            />
          </div>
          <div class="col">
            <q-input
              v-model="maxLevel"
              type="number"
              :label="t('tournamentPage.editPage.maxLevelText')"
            />
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
              :label="t('description')"
              autogrow
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions :align="$q.screen.width < mobileWidth ? '' : 'right'">
        <q-btn
          no-caps
          color="green"
          rounded
          :class="
            $q.screen.width < mobileWidth ? 'buttonMobile q-pa-sm' : 'button'
          "
          :label="t('createButton')"
          @click="createEvent"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref, watchEffect } from "vue";
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";
import locationJSON from "src/composables/location.json";
import { useI18n } from "vue-i18n";
// global variables
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const mobileWidth = proxy.$mobileWidth;
const apiStore = useApiStore();
const { t } = useI18n();

const startDate = ref("");
const endDate = ref("");
const time = ref("");
const category = ref("");
const location = ref("");
const city = ref("");
const cost = ref("");
const description = ref("");
const tier = ref("");
const minLevel = ref("");
const maxLevel = ref("");
const locationOptions = ref(locationJSON);
const tierOptions = ref([]);

const categoryOptions = ref([]);

const cities = ref([]);
// assigning values
const getList = async () => {
  // city
  await apiStore.getCity(serverURL, $q);
  cities.value = apiStore.city.value;
  // category
  await apiStore.getCategory(serverURL, $q);
  categoryOptions.value = apiStore.category.value;

  await apiStore.getTier(serverURL, $q);
  tierOptions.value = apiStore.tier.value;
  console.log(apiStore.category.value);
};

onMounted(() => {
  getList();
});

// button
const createEvent = async () => {
  const payload = {
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    startTime: time.value,
    category: category.value,
    tier: tier.value,
    location: location.value,
    city: city.value,
    minLevel: minLevel.value,
    maxLevel: maxLevel.value,
    cost: cost.value,
  };
  postMethod(serverURL, "tournament", payload, $q, "Турнир успешно создан");
};
</script>

<style>
.button {
  width: 150px;
  font-size: 18px;
}

.buttonMobile {
  width: 100%;
}
</style>
