<template>
  <div>
    <section v-if="!isAuthPage" class="bg-grey-4 text-center q-pa-md">
      News!
    </section>
    <q-layout
      view="hHr LpR lFf"
      container
      style="height: 100vh"
      class="bg-transparent"
    >
      <q-header
        reveal
        elevated
        style="background-color: white"
        v-if="!isAuthPage && !$q.screen.width > mobileWidth"
      >
        <q-toolbar class="bg-white text-black">
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
          <q-toolbar-title> tennis.kz </q-toolbar-title>
        </q-toolbar>
        <q-drawer
          v-if="$q.screen.width > mobileWidth"
          side="left"
          v-model="drawer"
          bordered
          :width="220"
          :breakpoint="500"
          content-class="bg-grey-3"
        >
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              class="text-black"
              v-for="(buttons, index) in isUser"
              :key="index"
              @click="navigationBar(buttons.link)"
            >
              <q-item-section>{{ buttons.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-drawer>
      </q-header>
      <q-page-container>
        <q-page>
          <router-view />

          <SearchPage
            :isSearch="isSearch"
            @closeSearchDialog="closeSearchDialog"
          />
          <q-page-scroller
            position="bottom-right"
            :scroll-offset="150"
            :offset="[18, 18]"
          >
            <q-btn icon="keyboard_arrow_up" color="black" />
          </q-page-scroller>
        </q-page>
      </q-page-container>
      <q-footer
        reveal
        elevated
        style="background-color: #30222e"
        align="center"
      >
        <q-toolbar
          class="text-white justify-center"
          style="background-color: #30222e"
        >
          <div v-for="(button, index) in isUser" :key="index">
            <q-btn
              v-if="button.icon"
              flat
              round
              dense
              :icon="button.icon"
              class="q-mr-md"
              @click="$router.push(button.link)"
            />
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import { getCurrentInstance } from "vue";
import { Cookies } from "quasar";
import { useApiStore } from "src/stores/api-store";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const adminRole = proxy.$adminRole;
const route = useRoute();
const apiStore = useApiStore();

const isAuthPage = computed(() => {
  return route.path === "/registration" || route.path === "/authorization";
});

const userRole = ref("");
const isUser = ref("");

const headerButtonsArrayForUser = ref([
  {
    name: "Main page",
    link: "/",
    icon: "mdi-home",
  },
  {
    name: "Tournaments",
    link: "/tournaments",
    icon: "mdi-trophy",
  },
  {
    name: "Regulations",
    link: "/regulations",
  },
  {
    name: "Rating",
    link: "/ratings",
  },
  {
    name: "Coaches",
    link: "/coaches",
    icon: "mdi-account-group",
  },
  {
    name: "Media Library",
    link: "/media-library",
  },
  {
    name: "News",
    link: "/news",
  },
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Find a partner",
    link: "/find-partner",
    icon: "mdi-account-search",
  },
  {
    name: "Profile",
    link: "/profile",
    icon: "mdi-account",
  },
]);

const headerButtonsArrayForAdmin = computed(() => [
  {
    name: "Users",
    link: "/admin/users",
    messageNumber: 45,
  },
  {
    name: "Coaches",
    link: "/admin/coaches",
    messageNumber: localStorage.getItem("numberCoach"), // Теперь обновляется динамически
  },
]);

const router = useRouter();
const routePath = useRoute();
const currentPath = ref(routePath.path);
const drawer = ref(true);

const defineRole = async () => {
  await apiStore.getUserProfile();
  userRole.value = apiStore.userData.role;
  if (userRole.value === "USER" || userRole.value === "HR") {
    isUser.value = headerButtonsArrayForUser.value;
  } else if (userRole.value === "ADMIN") {
    isUser.value = headerButtonsArrayForAdmin.value;
  }
  console.log(userRole.value);
};

onMounted(() => {
  saveCurrentPath();
  if (Cookies.has("accessToken")) {
    defineRole();
  }
});

const saveCurrentPath = () => {
  watch(
    () => routePath.path,
    (newPath) => {
      currentPath.value = newPath;
    }
  );
};

const pushToPage = (route) => {
  try {
    router.push(route).then(() => {
      currentPath.value = router.currentRoute.value.path;
    });
  } catch (error) {
    throw new Error(
      `Произошла ошибка: ${error}, в компоненте AppLayout функция pushToPage`
    );
  }
};

const navigationBar = (route) => {
  router.push(route);
};

const isSearch = ref(false);
const openSearch = () => {
  isSearch.value = true;
};

const closeSearchDialog = () => {
  isSearch.value = false;
};

const pushToProfile = () => {
  router.push("/profile");
};

const width = ref(window.innerWidth);
const isDesktop = ref("");
const updateWidth = () => {
  width.value = window.innerWidth;
  isDesktop.value = width.value > mobileWidth;
};

updateWidth();
onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<style scoped>
.activePage {
  text-decoration: underline;
}

.mobileNavigation {
  position: relative;
  left: 45px;
}
</style>
