<template>
  <div>
    <q-dialog v-model="isSearch" persistent>
      <q-card>
        <q-card-section>
          <span class="text-body1">Поиск</span>
        </q-card-section>
        <q-card-section>
          <q-input
            standout
            v-model="text"
            label="Поиск..."
            input-class="text-left"
            class="searchClass"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                class="cursor-pointer"
                @click="searchContent"
              />
              <q-icon
                v-if="text !== ''"
                name="clear"
                class="cursor-pointer"
                @click="text = ''"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

const isSearch = ref(true);
const text = ref("");
const $q = useQuasar();

const searchContent = () => {};
</script>

<style scoped></style>
