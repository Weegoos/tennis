<template>
  <div>
    <q-dialog v-model="isEditTournament" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="red-4"
            @click="closeEditTournament"
          />
          <q-btn flat label="Edit" color="green-4" @click="editTournament" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openEditTournamentComponent: {
    type: Boolean,
    required: true,
  },
});

const isEditTournament = ref(props.openEditTournamentComponent);

watch(
  () => props.openEditTournamentComponent,
  (newVal) => {
    isEditTournament.value = newVal;
  }
);

const emit = defineEmits(["closeEditTournament"]);
const closeEditTournament = () => {
  emit("closeEditTournament");
};

const editTournament = async () => {
  try {
  } catch (error) {}
};
</script>

<style></style>
