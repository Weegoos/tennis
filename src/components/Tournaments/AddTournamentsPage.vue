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
            <q-select v-model="category" :options="categoryOptions" label="Category"  />
          </div>
          <div class="col">
            <q-input v-model="maxParticipants" type="number" label="Maximum number of participants" />
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
      </q-card-section>
      <q-card-actions  align="right">
        <q-btn no-caps color="green-4" label="Create" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const startDate = ref("");
const endDate = ref("");
const time = ref("");
const category = ref('')
const location = ref('')
const city = ref('')

const categoryOptions = ref(['Single'])
</script>

<style></style>
