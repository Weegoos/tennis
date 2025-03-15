<template>
  <div>
    <q-dialog v-model="isOpenDetailedWindowAboutCoache" persistent>
      <q-card>
        <q-card-section class="row items-center">
          {{ props.coacheInformation.user }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            label="Close"
            color="red-4"
            @click="closeWindow"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openDetailedWindow: {
    type: Boolean,
    required: true,
  },
  coacheInformation: {
    type: Object,
    required: true,
  },
});

const isOpenDetailedWindowAboutCoache = ref(props.openDetailedWindow);

watch(
  () => props.openDetailedWindow,
  (newVal) => {
    isOpenDetailedWindowAboutCoache.value = newVal;
  }
);

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};
</script>

<style></style>
