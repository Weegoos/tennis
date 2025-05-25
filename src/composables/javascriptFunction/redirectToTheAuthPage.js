import { useApiStore } from "src/stores/api-store";
const clientURL = "https://kaz-tennis.netlify.app";
async function redirectToUser() {
  try {
    const apiStore = useApiStore();
    await apiStore.getUserProfile();

    if (
      apiStore.userData.role === null ||
      apiStore.userData.role === undefined
    ) {
      window.location.href = `${clientURL}authorization`;
    }
  } catch (error) {
    window.location.href = `${clientURL}authorization`;
  }
}

async function redirectForUserThatOpenAdminPage() {
  try {
    const apiStore = useApiStore();
    await apiStore.getUserProfile();
    console.log(apiStore.userData.role);
    if (apiStore.userData.role != "ADMIN") {
      window.location.href = `${clientURL}`;
    }
  } catch (error) {
    window.location.href = `${clientURL}authorization`;
  }
}

export { redirectToUser, redirectForUserThatOpenAdminPage };
