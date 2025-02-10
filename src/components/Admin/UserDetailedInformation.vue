<template>
  <div>
    <q-dialog v-model="isUserDetailedInformation" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">{{ props.userInfo }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
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
</script>

<style></style>
