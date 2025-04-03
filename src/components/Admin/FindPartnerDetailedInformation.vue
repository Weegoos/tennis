<template>
  <div>
    <q-dialog v-model="isPartnerDetailedInformation" persistent>
      <q-card>
        <q-card-section
          data-testid="dialogID"
          v-if="props.partnerInfo"
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
                    {{ props.partnerInfo.firstName || "Not specified" }}
                    {{ props.partnerInfo.lastName || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    {{ props.partnerInfo.rating || "Not specified" }}
                  </p>
                  <span class="infoHeadline">City</span>
                  <p class="infoStyle">
                    {{ props.partnerInfo.city || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Stadium</span>
                  <p class="infoStyle">
                    {{ props.partnerInfo.stadium || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Description</span>
                  <p class="infoStyle">
                    {{ props.partnerInfo.description || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Created At</span>
                  <p class="infoStyle">
                    {{ props.partnerInfo.createdAt || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Updated At</span>
                  <p class="infoStyle">
                    {{ props.partnerInfo.updatedAt || "Not specified" }}
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
            @click="closePartnerDetailedInformation"
          />
          <q-btn
            no-caps
            color="green-4"
            label="Approve"
            @click="approvePartner"
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
  isOpenPartnerDetailedInformation: {
    type: Boolean,
  },
  partnerInfo: {
    type: Object,
    required: true,
  },
});
const isPartnerDetailedInformation = ref(
  props.isOpenPartnerDetailedInformation
);

watch(
  () => props.isOpenPartnerDetailedInformation,
  (newVal) => {
    isPartnerDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closePartnerDetailedInformation"]);
const closePartnerDetailedInformation = () => {
  emit("closePartnerDetailedInformation");
};

const approvedPartner = ref("");
const approvePartner = async () => {
  await patchMethod(
    serverURL,
    `partner/enable`,
    props.partnerInfo.id,
    approvedPartner.value,
    $q,
    "Success",
    "Error",
    null
  );
  console.log(props.partnerInfo.id);
};
</script>

<style></style>
