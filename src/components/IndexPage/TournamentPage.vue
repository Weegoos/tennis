<template>
  <div>
    <div class="">
      <p class="text-h4 text-bold">News</p>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey bg-transparent"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="all" label="All" />
        <q-tab name="interview" label="Interview" />
        <q-tab name="championship" label="Championships" />
        <q-tab name="analysis" label="Analysis" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="all">
          <div class="text-h6"></div>
          <div class="row q-gutter-md">
            <div class="col">
              <q-img
                src="https://images.unsplash.com/photo-1530915534664-4ac6423816b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                :ratio="16 / 9"
                spinner-color="primary"
                spinner-size="82px"
              >
                <caption class="absolute-bottom-left text-white q-pa-sm">
                  <span class="bg-primary q-pa-sm date relative-position">
                    July 14th
                  </span>
                  <div class="text-bold text-h6">
                    SILK ROAD OPEN SEPTEMBER 12-13-14, 2024
                  </div>
                </caption>
              </q-img>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="interview">
          <div class="text-h6"></div>
          The interview will be displayed here
        </q-tab-panel>

        <q-tab-panel name="championship">
          <div class="text-h6"></div>
          The news about the Championship will be displayed here
        </q-tab-panel>

        <q-tab-panel name="analysis">
          The news about the analysis will be displayed here
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("all");
</script>

<style scoped>
.date {
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  left: -43%;
}
</style>
