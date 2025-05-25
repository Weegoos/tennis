<template>
  <div>
    <q-dialog v-model="isUserDetailedInformation" persistent>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="data" label="Data" />
          <q-tab name="edit" label="Edit" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="data">
            <q-card-section
              data-testid="dialogID"
              v-if="props.userInfo"
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
                        {{
                          props.userInfo.userInfo.firstName || "Not specified"
                        }}
                        {{
                          props.userInfo.userInfo.lastName || "Not specified"
                        }}
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
            <q-card-section v-else> No data </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="edit">
            <q-input
              v-model="role"
              type="text"
              label="Change the role"
              list="role"
            />

            <datalist id="role">
              <section v-for="(role, index) in roles.value" :key="index">
                <option :value="role"></option>
              </section>
            </datalist>
            <q-btn
              color="primary"
              style="width: 100%"
              rounded
              class="q-my-sm"
              no-caps
              label="Edit"
              @click="editRole"
            />
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions class="q-pr-lg" align="right">
          <BaseCloseButton
            label="Close"
            @click="closeUserDetailedInformation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import BaseCloseButton from "../atoms/BaseCloseButton.vue";
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();

const props = defineProps({
  isOpenUserDetailedInformation: {
    type: Boolean,
  },
  userInfo: {
    type: Object,
    required: true,
  },
});
const isUserDetailedInformation = ref(props.isOpenUserDetailedInformation);
const tab = ref("data");
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

const roles = ref([]);
const getRoles = async () => {
  await apiStore.getRoles(serverURL, $q);
  roles.value = apiStore.role;
};

onMounted(() => {
  getRoles();
  console.log(roles.value);
});

const role = ref("");
const editRole = async () => {
  try {
    putMethod(
      serverURL,
      `user/role`,
      role,
      $q,
      "The role has been changed",
      "Error: ",
      {}
    );
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
