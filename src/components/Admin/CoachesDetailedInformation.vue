<template>
  <div>
    <q-dialog v-model="isCoachesDetailedInformation" persistent>
      <q-card>
        <q-card-section
          data-testid="dialogID"
          v-if="props.coachesInfo"
          class="row items-center"
        >
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
                    {{ props.coachesInfo.user.firstName || "Not specified" }}
                    {{ props.coachesInfo.user.lastName || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Gender</span>
                  <p class="infoStyle">
                    {{ props.coachesInfo.user.gender || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Phone Number</span>
                  <p class="infoStyle">
                    <!-- {{ props.userInfo.userInfo.phone || "Not specified" }} -->
                  </p>
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    <!-- {{ props.userInfo.userInfo.rating || "Not specified" }} -->
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-section v-else> No data </q-card-section>
        <q-card-actions class="q-pr-lg" align="right">
          <q-btn
            no-caps
            label="Close"
            color="red-4"
            @click="closeCoacheDetailedInformation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpenCoachesDetailedInformation: {
    type: Boolean,
  },
  coachesInfo: {
    type: Object,
    required: true,
  },
});
const isCoachesDetailedInformation = ref(
  props.isOpenCoachesDetailedInformation
);

watch(
  () => props.isOpenCoachesDetailedInformation,
  (newVal) => {
    isCoachesDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeCoacheDetailedInformation"]);
const closeCoacheDetailedInformation = () => {
  emit("closeCoacheDetailedInformation");
};
</script>

<style></style>
