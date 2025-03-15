<template>
  <div>
    <div class="card">
      <p class="text-h4 text-bold">Coaches</p>
      <q-btn color="primary" label="Add a form" @click="addForm" />
    </div>
    <q-card
      data-testid="coachesID"
      class="card"
      v-for="(items, index) in coaches"
      :key="index"
    >
      <q-card-section class="row q-gutter-md">
        <div class="col-2">
          <q-img
            src="src/assets/coaches/coaches1.jpg"
            :ratio="10 / 9"
            spinner-color="primary"
            spinner-size="82px"
            class="full-height"
          />
        </div>
        <section class="col">
          <div class="text-h4 text-bold">
            {{ items.user.firstName || "Not specified" }}
            {{ items.user.lastName || "Not specified" }}
          </div>
          <div class="text-subtitle1">
            {{ items.description || "Not specified" }}
          </div>
          <section class="row">
            <div class="col">
              <div class="q-mt-lg">
                <p class="text-body1">
                  <span class="text-bold">Gender: </span
                  ><span>{{ items.gender || "Not specified" }}</span>
                </p>
                <p class="text-body1">
                  <span class="text-bold">Phone number: </span
                  ><span>{{ items.user.phone || "Not specified" }}</span>
                </p>
                <p class="text-body1">
                  <span class="text-bold">Service: </span
                  ><span>{{ items.service || "Not specified" }}</span>
                </p>
                <p class="text-body1">
                  <span class="text-bold">Experience: </span
                  ><span>{{ items.experience || "Not specified" }}</span>
                </p>
              </div>
            </div>
            <div class="col">
              <div class="q-mt-lg">
                <p class="text-body1">
                  <span class="text-bold">Rating: </span
                  ><span>{{ items.user.rating || "Not specified" }}</span>
                </p>
                <p class="text-body1">
                  <span class="text-bold">City: </span
                  ><span>{{ items.city }}</span>
                </p>
                <p class="text-body1">
                  <span class="text-bold">Language: </span
                  ><span>{{ items.language }}</span>
                </p>
                <p class="text-body1">
                  <span class="text-bold">Stadium: </span
                  ><span>{{ items.stadium }}</span>
                </p>
              </div>
            </div>
          </section>
        </section>
        <div class="col" align="right" data-testid="buttonSection">
          <q-btn flat color="black" icon="edit" @click="editCoaches" />
          <q-btn
            flat
            color="red-4"
            icon="delete"
            @click="deleteCoaches(items.id)"
          />
        </div>
      </q-card-section>
    </q-card>
    <AddFormComponent :openForm="openForm" @closeForm="closeForm" />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import AddFormComponent from "src/components/Coaches/AddFormComponent.vue";
import { useNotifyStore } from "src/stores/notify-store";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { deleteMethod } from "src/composables/apiMethod/delete";

// global variables
const notifyStore = useNotifyStore();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const openForm = ref(false);
const addForm = () => {
  openForm.value = true;
};

const closeForm = () => {
  openForm.value = false;
};

const coaches = ref("");
const getAllCoaches = async () => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverURL}coach/all`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      withCredentials: true,
    });

    const allCoaches = response.data.map((tournaments) => tournaments);
    coaches.value = allCoaches;
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  getAllCoaches();
});

const deleteCoaches = async (id) => {
  deleteMethod(serverURL, "coach", id, "Успешно удален");
};

const editCoaches = async () => {};
</script>

<style scoped>
.card {
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
