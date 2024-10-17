<template>
  <div>
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-header reveal elevated style="height: 70px; background-color: #0b76d5">
        <q-toolbar class="bg-transparent text-white q-mt-sm">
          <div class="row q-gutter-md" style="width: 100%">
            <div class="col-2">
              <q-btn flat round dense icon="assignment_ind" size="24px" />
            </div>
            <div class="col-8">
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
            <div class="col">Batyr</div>
          </div>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page> <router-view /></q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

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
  },
  {
    name: "Новости",
  },
  {
    name: "О нас",
  },
]);

const router = useRouter();
const routePath = useRoute();
const currentPath = ref(routePath.path);

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
  router.push(route).then(() => {
    currentPath.value = router.currentRoute.value.path;
    console.log("Новый маршрут:", currentPath.value);
  });
};
</script>

<style scoped>
.activePage {
  text-decoration: underline;
}

.unactivePage {
  text-decoration: none;
}
</style>
