<template>
  <div class="q-pa-md">
    <q-card
      class="my-card q-mt-sm row"
      v-for="(news, index) in allNews.data"
      :key="index"
    >
      <div class="col-2">
        <q-img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>
      <q-card-section class="col">
        <div class="text-h6">{{ news.title }}</div>
        <div class="text-subtitle2">
          By
          <q-btn
            rounded
            flat
            no-caps
            :label="news.author.email"
            @click="checkAuthorInfo(news.author)"
          />
          <p>{{ news.description }}</p>
        </div>
        <q-card-actions align="right">
          <q-btn flat icon="mdi-pencil" />
          <q-btn flat color="red-4" icon="mdi-delete" />
        </q-card-actions>

        <q-dialog
          v-model="openWindowAboutAuthor"
          persistent
          style="width: 800px"
        >
          <q-card style="width: 800px">
            <q-card-section>
              <section class="row q-gutter-sm">
                <div class="col">
                  <span class="infoHeadline">Full Name</span>
                  <p class="infoStyle">
                    {{ news.author.userInfo.firstName }}
                    {{ news.author.userInfo.lastName }}
                  </p>
                </div>
                <div class="col">
                  <span class="infoHeadline">Phone Number</span>
                  <p class="infoStyle">{{ news.author.userInfo.phone }}</p>
                </div>
              </section>
              <section class="row q-gutter-sm">
                <div class="col">
                  <span class="infoHeadline">Rating</span>
                  <p class="infoStyle">
                    {{ news.author.userInfo.rating }}
                  </p>
                </div>
                <div class="col">
                  <span class="infoHeadline">Age</span>
                  <p class="infoStyle">{{ news.author.userInfo.age }}</p>
                </div>
              </section>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const allNews = ref([]);
const getAllNews = async () => {
  try {
    await getMethod(
      serverURL,
      "news/allNews?page=1&size=10",
      allNews,
      $q,
      "Error: "
    );
  } catch (error) {
    console.error(error);
  }
};

const openWindowAboutAuthor = ref(false);
const checkAuthorInfo = async (authorInfo) => {
  openWindowAboutAuthor.value = true;
};

onMounted(() => {
  getAllNews();
});
</script>

<style></style>
