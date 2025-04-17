<template>
  <div v-if="role === 'ADMIN'">
    <div class="q-pa-md" data-testid="rowsID" v-if="rows && rows.length">
      <q-table
        data-testid="userTable"
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="id"
        @row-click="viewDetailedInformation"
        loading="true"
        hide-bottom
      />

      <FindPartnerDetailedInformation
        :isOpenPartnerDetailedInformation="isOpenPartnerDetailedInformation"
        :partnerInfo="Object(partnerInfo)"
        @closePartnerDetailedInformation="closePartnerDetailedInformation"
      />
    </div>
    <div v-else data-testid="noData">
      <p>No data</p>
    </div>
    <q-pagination
      class="justify-center"
      v-model="current"
      :min="1"
      :max="maxPage"
      @update:model-value="pagination"
    />
  </div>
  <div v-else>У вас нет прав для просмотра данной страницы</div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import FindPartnerDetailedInformation from "src/components/Admin/FindPartnerDetailedInformation.vue";
import { getMethod } from "src/composables/apiMethod/get";
import { useApiStore } from "src/stores/api-store";
import { redirectForUserThatOpenAdminPage } from "src/composables/javascriptFunction/redirectToTheAuthPage";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const statusForAdmin = proxy.$statusForAdmin;
const $q = useQuasar();
const apiStore = useApiStore();

const columns = [
  {
    name: "id",
    label: "Id",
    align: "left",
    field: `id`,
    sortable: true,
  },
  {
    name: "fullName",
    label: "Full Name",
    align: "left",
    field: (partner) => `${partner.lastName} ${partner.firstName}`,
    sortable: true,
  },
  {
    name: "city",
    label: "City",
    align: "left",
    field: "city",
    sortable: true,
  },
  {
    name: "stadium",
    label: "Stadium",
    align: "left",
    field: "stadium",
    sortable: true,
  },
  {
    name: "rating",
    label: "Rating",
    align: "left",
    field: "rating",
    sortable: true,
  },
];

const rows = ref([]);
const maxPage = ref("");

const getEnabledPartner = async (page) => {
  await getMethod(
    serverURL,
    `partner/page?page=${page}&size=${maxNumberOfRequestPerPage}&enabled=${statusForAdmin}`,
    rows,
    $q,
    "Ошибка при получении данных о тренерах"
  ).then(() => {
    maxPage.value = Math.ceil(
      rows.value.totalCount / maxNumberOfRequestPerPage
    );
    rows.value = rows.value.data.map((partner, index) => ({
      ...partner,
    }));
  });

  console.log(rows);
};

const enabledCoachesLength = ref(0);
// const getEnabledCoachesLength = async () => {
//   await getMethod(
//     serverURL,
//     "coach?enabled=false",
//     enabledCoachesLength,
//     $q,
//     "Ошибка при получении количество тренеров в админ странице:"
//   );
//   console.log(enabledCoachesLength.value.length);
//   await apiStore.setNumber(enabledCoachesLength.value.length);
//   localStorage.setItem("numberCoach", enabledCoachesLength.value.length);
// };

const current = ref(1);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  getEnabledCoaches(current.value);
};

const role = ref(null);
const getAdminRole = async () => {
  await apiStore.getUserProfile();
  role.value = apiStore.userData.role;
};

onMounted(() => {
  getEnabledPartner(1);
  redirectForUserThatOpenAdminPage();
  getAdminRole();
});

const isOpenPartnerDetailedInformation = ref(false);
const partnerInfo = ref([]);
const viewDetailedInformation = (evt, row, index) => {
  console.log(777);

  isOpenPartnerDetailedInformation.value = true;
  partnerInfo.value = row;
  console.log(row);
};

const closePartnerDetailedInformation = () => {
  isOpenPartnerDetailedInformation.value = false;
};
</script>

<style></style>
