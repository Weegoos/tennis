<template>
  <div>
    <q-layout
      view="hHr LpR lFf"
      container
      style="height: 100vh"
      class="bg-transparent"
    >
      <q-header
        reveal
        elevated
        style="height: 70px; background-color: #0b76d5"
        v-if="!isAuthPage"
      >
        <q-toolbar class="bg-transparent text-white q-mt-sm">
          <div class="row q-gutter-md" style="width: 100%">
            <div class="col-2">
              <q-btn flat round dense icon="assignment_ind" size="24px" />
            </div>
            <div class="col-8" v-show="isDesktop">
              <div class="row q-mt-sm" style="justify-content: center">
                <section
                  v-for="(buttons, index) in headerButtonsArray"
                  :key="index"
                  class="text-white row"
                >
                  <q-btn
                    no-caps
                    flat
                    size="14px"
                    :label="buttons.name"
                    @click="pushToPage(buttons.link)"
                    :class="
                      currentPath === buttons.link
                        ? 'activePage'
                        : 'unactivePage'
                    "
                  />
                </section>
              </div>
            </div>
            <div
              class="col"
              :align="$q.screen.width > mobileWidth ? 'center' : 'left'"
            >
              <div
                class="row"
                :class="$q.screen.width > mobileWidth ? 'q-gutter-md' : ''"
              >
                <q-btn icon="search" @click="openSearch" size="14px" fab />
                <q-btn icon="person" @click="pushToProfile" size="14px" fab />
              </div>
            </div>
            <div class="col" align="right" v-if="$q.screen.width < mobileWidth">
              <q-btn
                flat
                icon="menu"
                class="q-mt-sm"
                size="14px"
                @click="drawer = !drawer"
              />
            </div>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-if="$q.screen.width < mobileWidth"
        side="right"
        v-model="drawer"
        bordered
        :width="200"
        :breakpoint="500"
        content-class="bg-grey-3"
      >
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="(buttons, index) in headerButtonsArray"
            :key="index"
            @click="navigationBar(buttons.link)"
          >
            <q-item-section>{{ buttons.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
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
        v-if="!isAuthPage"
        style="background-color: #24293e"
        reveal
        elevated
        class="q-pa-md"
      >
        <FooterPage />
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
import SearchPage from "../pages/SearchPage.vue";
import FooterPage from "src/pages/FooterPage.vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const route = useRoute();

const isAuthPage = computed(() => {
  return route.path === "/registration" || route.path === "/authorization";
});

const headerButtonsArray = ref([
  {
    name: "Главная страница",
    link: "/",
  },
  {
    name: "Турниры",
    link: "/tournaments",
  },
  {
    name: "Регламент",
    link: "/regulations",
  },
  {
    name: "Рейтинг",
    link: "/ratings",
  },
  {
    name: "Медиатека",
    link: "/media-library",
  },
  {
    name: "Новости",
    link: "/news",
  },
  {
    name: "О нас",
    link: "/about",
  },
]);

const router = useRouter();
const routePath = useRoute();
const currentPath = ref(routePath.path);
const drawer = ref(true);

onBeforeMount(() => {
  saveCurrentPath();
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
</style>
