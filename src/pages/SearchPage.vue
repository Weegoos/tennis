<template>
  <div>
    <q-dialog v-model="isOpenSearch" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <span class="text-body1">Search</span>
        </q-card-section>
        <q-card-section>
          <q-input
            standout
            v-model="text"
            label="Start typing here..."
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
        <q-card-actions vertical align="right">
          <q-btn color="negative" no-caps @click="closeSearch" label="Close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, watch } from "vue";

const text = ref("");
const $q = useQuasar();

const props = defineProps({
  isSearch: {
    type: Boolean,
    required: true,
  },
});
const isOpenSearch = ref(props.isSearch);

watch(
  () => props.isSearch,
  (newVal) => {
    isOpenSearch.value = newVal;
  }
);

const emit = defineEmits(["closeSearchDialog"]);
const closeSearch = () => {
  emit("closeSearchDialog");
};

const searchContent = () => {};
</script>

<style scoped></style>
