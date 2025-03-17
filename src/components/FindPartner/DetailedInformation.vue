<template>
  <div>
    <q-dialog v-model="isOpenDetailedWindowAboutPartner" persistent>
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
                      props.fullInformationAboutPartner.firstName ||
                      "Not specified"
                    }}
                    {{
                      props.fullInformationAboutPartner.lastName ||
                      "Not specified"
                    }}
                  </p>

                  <span class="infoHeadline">Phone Number</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.phone || "Not specified"
                    }}
                  </p>
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.rating ||
                      "Not specified"
                    }}
                  </p>
                  <span class="infoHeadline">City</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.city || "Not specified"
                    }}
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
                  <span class="infoHeadline">Description</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.description ||
                      "Not specified"
                    }}
                  </p>
                  <span class="infoHeadline">Stadium</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.stadium ||
                      "Not specified"
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              caption="Created, updated time"
              icon="filter_3"
              label="Time"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">Created At</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.createdAt ||
                      "Not specified"
                    }}
                  </p>
                  <span class="infoHeadline">Updated At</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.updatedAt ||
                      "Not specified"
                    }}
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
  fullInformationAboutPartner: {
    type: Object,
  },
});

const isOpenDetailedWindowAboutPartner = ref(props.openDetailedWindow);

watch(
  () => props.openDetailedWindow,
  (newVal) => {
    isOpenDetailedWindowAboutPartner.value = newVal;
  }
);
const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};
</script>

<style></style>
