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
          <q-btn rounded icon="mdi-account-search" @click="searchUserByInput" />
        </q-card-section>
        <q-table
          v-show="isClickedToSearchUser"
          flat
          bordered
          title="User(-s)"
          :rows="rows"
          :columns="columns"
          row-key="name"
          hide-bottom
        >
          <template v-slot:body-cell-actions="props">
            <q-td align="center">
              <q-btn
                color="primary"
                icon="mdi-account-plus"
                size="sm"
                @click="inviteUser(props.row)"
              />
            </q-td>
          </template>
        </q-table>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            label="Close"
            color="primary"
            @click="closeSearchPartnerComponent"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const props = defineProps({
  isOpenSearchComponent: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const confirm = ref(props.isOpenSearchComponent);

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
    name: "id",
    required: true,
    label: "№",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "firstName",
    required: true,
    label: "First Name",
    align: "left",
    field: "firstName",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "lastName",
    align: "center",
    label: "Last Name",
    field: "lastName",
    sortable: true,
  },
  {
    name: "rating",
    label: "Rating",
    field: "rating",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "actions",
    label: "Пригласить",
    align: "center",
    field: "id",
  },
];

const usersBySearch = ref([]);
const rows = ref([]);
const searchUser = ref("");
const isClickedToSearchUser = ref(true);

const searchUserByInput = () => {
  getAllUserBySearch(searchUser.value);
  isClickedToSearchUser.value = true;
};

const getAllUserBySearch = async (input) => {
  try {
    await getMethod(
      serverURL,
      `user/search?name=${input}&page=1&size=10`,
      usersBySearch,
      $q,
      "Ошибка при получении пользоветелй поо поиску: "
    );

    rows.value = usersBySearch.value.data.map((user) => user);

    console.log(rows.value);
  } catch (error) {
    console.error(error);
  }
};

const inviteUser = (row) => {
  console.log(row);
};
</script>

<style></style>
