<template>
  <div>
    <q-dialog v-model="form" persistent>
      <q-card style="width: 800px">
        <p class="text-h5 text-bold text-center q-mt-md">Coach's profile</p>
        <q-card-section class="row q-gutter-md">
          <section class="col">
            <q-input v-model="text" type="text" label="First Name" />
            <q-input v-model="text" type="text" label="Last Name" />
            <q-input v-model="text" type="text" label="About me" />
          </section>
          <section class="col">
            <q-input
              v-model="text"
              type="text"
              label="Length of service (how many years)"
            />
            <q-input
              v-model="text"
              type="text"
              label="The city where the coach conducts training"
            />
            <q-input v-model="text" type="text" label="Telephone Number" />
          </section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="negative" @click="closeForm" />
          <q-btn flat label="Send a request" color="positive" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openForm: {
    type: Boolean,
    required: true,
  },
});

const form = ref(props.openForm);

watch(
  () => props.openForm,
  (newVal) => {
    form.value = newVal;
  }
);

const emit = defineEmits(["closeForm"]);
const closeForm = () => {
  emit("closeForm");
};
</script>

<style></style>
