<template>
  <div>
    <q-dialog v-model="form" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="negative" @click="closeForm" />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
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
