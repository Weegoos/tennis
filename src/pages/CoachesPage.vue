<template>
  <div>
    <div class="card">
      <p class="text-h4 text-bold">Coaches</p>
      <q-btn color="primary" label="Add a form" @click="addForm" />
    </div>
    <q-card class="card" v-for="(items, index) in coaches" :key="index">
      <q-card-section class="row q-gutter-md">
        <div class="col-2">
          <q-img
            src="src/assets/coaches/coaches1.jpg"
            :ratio="10 / 9"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
        <section class="col">
          <div class="text-h4 text-bold">{{ items.name }}</div>
          <div class="text-subtitle1">{{ items.description }}</div>
          <section class="row">
            <div class="col">
              <div class="q-mt-lg">
                <p class="text-body1">
                  <span class="text-bold">Phone number: </span
                  ><span>{{ items.number }}</span>
                </p>
              </div>
            </div>
            <div class="col">
              <div class="q-mt-lg">
                <p class="text-body1">
                  <span class="text-bold">City: </span
                  ><span>{{ items.city }}</span>
                </p>
              </div>
            </div>
          </section>
        </section>
      </q-card-section>
    </q-card>
    <AddFormComponent :openForm="openForm" @closeForm="closeForm" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddFormComponent from "src/components/Coaches/AddFormComponent.vue";

const openForm = ref(false);
const addForm = () => {
  openForm.value = true;
};

const closeForm = () => {
  openForm.value = false;
};
</script>

<style scoped>
.card {
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
