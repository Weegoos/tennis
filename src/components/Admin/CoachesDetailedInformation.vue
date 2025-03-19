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
                    {{ props.coachesInfo.user.phone || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    {{ props.coachesInfo.user.rating || "Not specified" }}
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
          <q-btn
            no-caps
            color="green-4"
            label="Approve"
            @click="approveCoach"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { patchMethod } from "src/composables/apiMethod/patch";
import { getCurrentInstance, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

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

const approvedCoach = ref("");
const approveCoach = async () => {
  await patchMethod(
    serverURL,
    `coach/enable`,
    props.coachesInfo.id,
    approvedCoach.value,
    $q,
    "Success",
    "Error",
    null
  );
  console.log(props.coachesInfo.id);
};
</script>

<style></style>
