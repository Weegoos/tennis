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
            <q-input
              v-model="searchUser"
              type="text"
              :label="t('tournamentPage.searchPartnerPage.searchUser')"
            />
          </div>
          <q-btn rounded icon="mdi-account-search" @click="searchUserByInput" />
        </q-card-section>
        <q-table
          v-show="isClickedToSearchUser"
          flat
          bordered
          :title="t('tournamentPage.searchPartnerPage.usersText')"
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
        <q-pagination
          class="justify-center q-my-sm text-center"
          v-model="current"
          :min="1"
          :max="maxPage"
          @update:model-value="pagination"
        />
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            :label="t('tournamentPage.searchPartnerPage.closeButton')"
            color="red-4"
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
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";
import { computed, getCurrentInstance, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

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
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const apiStore = useApiStore();
const { t } = useI18n();

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

const columns = computed(() => [
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
    label: t("firstNameText"),
    align: "left",
    field: "firstName",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "lastName",
    align: "center",
    label: t("lastNameText"),
    field: "lastName",
    sortable: true,
  },
  {
    name: "rating",
    label: t("ratingText"),
    field: "rating",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "actions",
    label: t("tournamentPage.searchPartnerPage.inviteButton"),
    align: "center",
    field: "id",
  },
]);

const usersBySearch = ref([]);
const rows = ref([]);
const searchUser = ref("");
const isClickedToSearchUser = ref(false);

// pagination
const maxPage = ref("");
watch(
  () => usersBySearch.value,
  (newVal) => {
    if (newVal && newVal.totalCount) {
      maxPage.value = Math.ceil(newVal.totalCount / maxNumberOfRequestPerPage);
    } else {
      maxPage.value = 1;
    }
  }
);
const current = ref(1);
const pagination = (page) => {
  current.value = page;
};

const fetchUsers = () => {
  if (!searchUser.value) return;
  getAllUserBySearch(searchUser.value, current.value);
};

const searchUserByInput = () => {
  current.value = 1;
  isClickedToSearchUser.value = true;
  fetchUsers();
};

watch(current, (newPage) => {
  if (isClickedToSearchUser.value) {
    fetchUsers();
  }
});

const getAllUserBySearch = async (input, page) => {
  try {
    await getMethod(
      serverURL,
      `user/search?name=${input}&page=${page}&size=${maxNumberOfRequestPerPage}`,
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

const inviteUser = async (row) => {
  try {
    await apiStore.getUserProfile();
    const url = window.location.hash;
    const match = url.match(/\/hr\/(\d+)/);
    const tournamentID = match[1];
    // console.log(apiStore.userData.id);
    // console.log(id);
    // console.log(row.id);
    const payload = {
      tournamentId: tournamentID,
      userId: apiStore.userData.id,
      partnerId: row.id,
    };
    postMethod(
      serverURL,
      "registration",
      payload,
      $q,
      "Приглашение успешно отправлено!"
    );
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
