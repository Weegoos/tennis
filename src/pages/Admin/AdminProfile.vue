<template>
  <div v-if="role == 'ADMIN'">
    <div>admin profile</div>
  </div>
  <div v-else>У вас нет прав для просмотра данной страницы</div>
</template>

<script setup>
import { redirectForUserThatOpenAdminPage } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { useApiStore } from "src/stores/api-store";
import { onMounted, ref } from "vue";

// global variables
const apiStore = useApiStore();

const role = ref(null);
const getAdminRole = async () => {
  await apiStore.getUserProfile();
  role.value = apiStore.userData.role;
};

onMounted(() => {
  getAdminRole();
  redirectForUserThatOpenAdminPage();
});
</script>

<style></style>
