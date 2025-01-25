<template>
  <div>
    <section class="fixed-center">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted, ref } from "vue";
import { useApiStore } from "src/stores/api-store";

const notifyStore = useNotifyStore();
const apiStore = useApiStore();

const firstName = ref("");
const secondName = ref("");
const phone = ref("");
const email = ref("");

onMounted(async () => {
  await apiStore.getUserProfile();
  console.log(apiStore.userData);
});
</script>

<style></style>
