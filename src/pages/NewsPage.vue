<template>
  <div class="q-pa-md">
    <q-card class="my-card q-pa-sm q-ma-sm text-center">
      <q-card-section>
        <div class="text-h5 text-bold">
          Latest sports news, expert insights, and player updates.
          <span class="text-light-green">All in one place.</span>
        </div>
        <div class="text-body1 q-mt-sm">
          Stay informed with up-to-date tennis news, exclusive interviews, and
          behind-the-scenes content.
        </div>
        <div class="row justify-center">
          <q-input
            style="width: 50vw"
            v-model="search"
            type="text"
            placeholder="Search..."
            class="q-mr-sm"
            dense
          />
          <q-btn
            dense
            class="q-pa-sm"
            color="primary"
            icon="search"
            @click="searchFunction"
          />
        </div>
      </q-card-section>
    </q-card>
    <div class="row">
      <section
        class="col-12 col-sm-6 col-md-4"
        v-for="(news, index) in allNews.data"
        :key="index"
      >
        <q-card
          class="my-card q-mt-md q-mx-sm q-pa-sm"
          style="border-radius: 10px"
        >
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/mountains.jpg"
              spinner-color="primary"
              spinner-size="82px"
              style="border-radius: 10px"
            />
          </div>
          <q-card-section class="col">
            <q-btn
              no-caps
              color="light-green-6"
              :label="news.author.email"
              @click="checkAuthorInfo(news.author)"
            />
            <div class="text-h5 text-gray q-mt-md">{{ news.title }}</div>
            <div class="text-subtitle2 q-mt-sm">
              <p>{{ news.description }}</p>
            </div>
            <q-card-actions class="row q-gutter-sm text-center">
              <div class="col">
                <q-btn
                  color="green-2"
                  class="text-green-8"
                  no-caps
                  label="Edit"
                  style="width: 100%"
                  @click="openEditPage(news.id)"
                />
              </div>
              <div class="col">
                <q-btn
                  color="red-8"
                  no-caps
                  class="text-red-2"
                  label="Delete"
                  @click="deleteNews(news)"
                  style="width: 100%"
                />
              </div>
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
      </section>
      <EditNews
        :isOpenEditPage="Boolean(isOpenEditPage)"
        @closePage="closePage"
        :newsIdenticator="Number(newsIdenticator)"
      />
    </div>
    <q-pagination
      class="justify-center q-my-sm text-center"
      v-model="current"
      v-if="allNews > []"
      :min="1"
      :max="maxPage"
      @update:model-value="pagination"
    />
  </div>
</template>

<script setup>
import { all } from "axios";
import { useQuasar } from "quasar";
import EditNews from "src/components/News/EditNews.vue";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const humanResources = proxy.$humanResources;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const $q = useQuasar();

const allNews = ref([]);
const getAllNews = async (page) => {
  try {
    await getMethod(
      serverURL,
      `news/allNews?page=${page}&size=${maxNumberOfRequestPerPage}`,
      allNews,
      $q,
      "Error: "
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteNews = async (newsInfo) => {
  console.log(newsInfo.id);
  try {
    deleteMethod(serverURL, "news", newsInfo.id);
  } catch (error) {
    console.error(error);
  }
};

const openWindowAboutAuthor = ref(false);
const checkAuthorInfo = async (authorInfo) => {
  openWindowAboutAuthor.value = true;
};

const maxPage = ref("");
watch(
  () => allNews.value,
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
  console.log("Текущая страница:", page);
  current.value = page;
  getAllNews(current.value);
};

const newsIdenticator = ref(null);
const isOpenEditPage = ref(false);
const openEditPage = (newsId) => {
  isOpenEditPage.value = true;
  newsIdenticator.value = newsId;
};

const closePage = () => {
  isOpenEditPage.value = false;
};

// search
const search = ref("");
const searchFunction = () => {};

onMounted(() => {
  getAllNews(1);
});
</script>

<style></style>
