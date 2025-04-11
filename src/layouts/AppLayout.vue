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
        v-if="!isAuthPage && $q.screen.width > mobileWidth"
      >
        <q-toolbar class="bg-white text-black">
          <q-btn
            v-if="$q.screen.width > mobileWidth"
            flat
            round
            dense
            icon="menu"
            @click="drawer = !drawer"
          />
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
          class="fixed-drawer"
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
        v-if="!isAuthPage"
        elevated
        style="background-color: #30222e"
        align="center"
      >
        <q-toolbar
          class="text-white justify-center"
          style="background-color: #30222e"
          v-if="$q.screen.width <= mobileWidth"
        >
          <div v-for="(button, index) in isUser" :key="index">
            <q-btn
              v-if="button.icon"
              flat
              round
              dense
              :icon="button.icon"
              class="q-mr-md q-pa-md"
              rounded
              :class="
                fullPath === button.link
                  ? 'round bg-white text-black'
                  : 'text-white'
              "
              @click="$router.push(button.link)"
            />
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { Cookies, useQuasar } from "quasar";
import { useApiStore } from "src/stores/api-store";
import { getMethod } from "src/composables/apiMethod/get";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const adminRole = proxy.$adminRole;
const serverURL = proxy.$serverURL;
const route = useRoute();
const fullPath = ref(route.fullPath);
const $q = useQuasar();

const isAuthPage = computed(() => {
  return route.path === "/registration" || route.path === "/authorization";
});

watch(
  () => route.fullPath,
  (newPath) => {
    fullPath.value = newPath;
  }
);

const userRole = ref("USER");
const isUser = ref("USER");

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
    icon: "mdi-account",
  },
  {
    name: "Coaches",
    link: "/admin/coaches",
    icon: "mdi-account-group",
    messageNumber: localStorage.getItem("numberCoach"), // Теперь обновляется динамически
  },
  {
    name: "Find a partner",
    link: "/admin/partner",
    icon: "mdi-account-search",
  },
  {
    name: "Profile",
    link: "/admin/profile",
    icon: "mdi-account",
  },
]);

const router = useRouter();
const routePath = useRoute();
const currentPath = ref(routePath.path);
const drawer = ref(false);
isUser.value = headerButtonsArrayForUser.value;
const defineRole = async () => {
  try {
    await getMethod(serverURL, "user/authenticated", userRole, $q, "Error: ");
    console.log("Роль пользователя:", userRole.value);

    if (userRole.value.role === "USER" || userRole.value.role === "HR") {
      isUser.value = headerButtonsArrayForUser.value;
    } else if (userRole.value.role === "ADMIN") {
      isUser.value = headerButtonsArrayForAdmin.value;
    }
  } catch (error) {
    console.error("Ошибка при получении роли:", error);
  }
};

onBeforeMount(async () => {
  saveCurrentPath();
  if (Cookies.has("accessToken")) {
    userRole.value = "loading";
    await defineRole();
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

const navigationBar = (route) => {
  router.push(route);
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
