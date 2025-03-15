<template>
  <div>
    <q-dialog v-model="isOpenDetailedWindowAboutCoache" persistent>
      <q-card>
        <p class="text-center text-bold text-h5 q-mt-md">
          Detailed Information
        </p>
        <q-card-section class="row items-center">
          <q-list>
            <q-expansion-item
              popup
              caption="Full name, email, phone number"
              icon="filter_1"
              label="Personal data"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span data-testid="fullName" class="infoHeadline"
                    >Full name</span
                  >
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.user.firstName || "Not specified"
                    }}
                    {{
                      props.coacheInformation.user.lastName || "Not specified"
                    }}
                  </p>
                  <span class="infoHeadline">Gender</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.user.gender || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Phone Number</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.user.phone || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.user.rating || "Not specified" }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              caption="Experience, service, cost"
              icon="filter_2"
              label="Professional information"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span data-testid="" class="infoHeadline">Status</span>
                  <p class="infoStyle">
                    {{ status }}
                  </p>
                  <span data-testid="" class="infoHeadline">Experience</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.experience || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Cost</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.cost || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Service</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.service || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Language</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.language || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Description</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.description || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Stadium</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.stadium || "Not specified" }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            label="Close"
            color="red-4"
            @click="closeWindow"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openDetailedWindow: {
    type: Boolean,
    required: true,
  },
  coacheInformation: {
    type: Object,
    required: true,
  },
});

const isOpenDetailedWindowAboutCoache = ref(props.openDetailedWindow);

watch(
  () => props.openDetailedWindow,
  (newVal) => {
    isOpenDetailedWindowAboutCoache.value = newVal;
  }
);

const status = ref("");
watch(
  () => props.coacheInformation.enabled,
  (newVal) => {
    if (newVal == false) {
      status.value = "Not busy";
    } else {
      status.value = "Busy";
    }
  }
);

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};
</script>

<style></style>
