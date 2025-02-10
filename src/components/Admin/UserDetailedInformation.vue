<template>
  <div>
    <q-dialog v-model="isUserDetailedInformation" persistent>
      <q-card>
        <q-card-section class="row items-center" v-if="props.userInfo">
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
                  <span class="infoHeadline">Full name</span>
                  <p class="infoStyle">
                    {{ props.userInfo.userInfo.firstName || "Not specified" }}
                    {{ props.userInfo.userInfo.lastName || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Gender</span>
                  <p class="infoStyle">
                    {{ props.userInfo.userInfo.gender || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Email</span>
                  <p class="infoStyle">
                    {{ props.userInfo.email || "Not Specified" }}
                  </p>
                  <span class="infoHeadline">Phone Number</span>
                  <p class="infoStyle">
                    {{ props.userInfo.userInfo.phone || "Not specified" }}
                  </p>
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    {{ props.userInfo.userInfo.rating || "Not specified" }}
                  </p>
                  <!-- <span class="infoHeadline">Дата регистрации</span>
                  <p class="infoStyle">
                    {{ formattedRegistrationDate }}
                  </p> -->
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-actions class="q-pr-lg" align="right">
          <q-btn
            no-caps
            label="Close"
            color="red-4"
            @click="closeUserDetailedInformation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpenUserDetailedInformation: {
    type: Boolean,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
});
const isUserDetailedInformation = ref(props.isOpenUserDetailedInformation);

watch(
  () => props.isOpenUserDetailedInformation,
  (newVal) => {
    isUserDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeUserDetailedInformation"]);
const closeUserDetailedInformation = () => {
  emit("closeUserDetailedInformation");
};
</script>

<style></style>
