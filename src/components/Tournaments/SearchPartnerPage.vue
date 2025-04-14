<template>
  <div>
    <q-dialog
      v-model="confirm"
      persistent
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-card style="width: 800px">
        <q-card-section class="row">
          <div class="col">
            <q-input v-model="searchUser" type="text" label="Search the user" />
          </div>
          <q-btn rounded icon="mdi-account-search" @click="onClick" />
        </q-card-section>
        <q-table
          flat
          bordered
          title="User(-s)"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :separator="separator"
          hide-bottom
        />
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="closeSearchPartnerComponent"
          />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// global variables
const props = defineProps({
  isOpenSearchComponent: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const confirm = ref(props.isOpenSearchComponent);
const searchUser = ref("");

watch(
  () => props.isOpenSearchComponent,
  (newVal) => {
    confirm.value = newVal;
  }
);

const emit = defineEmits(["closeSearchPartnerComponent"]);
const closeSearchPartnerComponent = () => {
  emit("closeSearchPartnerComponent");
};

const columns = [
  {
    name: "firstName",
    required: true,
    label: "First Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "lastName",
    align: "center",
    label: "Last Name",
    field: "calories",
    sortable: true,
  },
  {
    name: "rating",
    label: "Rating",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
];
</script>

<style></style>
