<template>
  <div class="q-pa-md">
    <q-card class="my-card q-pa-sm q-ma-sm text-center">
      <q-card-section>
        <div class="text-h5 text-bold">
          {{ t("newsPage.mainText") }}
          <span class="text-light-green">{{
            t("newsPage.mainTextWithAnotherColor")
          }}</span>
        </div>
        <div class="text-body1 q-mt-sm">
          {{ t("newsPage.captionText") }}
        </div>
        <div class="row justify-center q-gutter-sm">
          <q-input
            style="width: 50vw"
            v-model="search"
            type="text"
            :placeholder="t('newsPage.search')"
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
          <q-btn
            color="primary"
            no-caps
            icon="mdi-plus"
            :label="t('newsPage.openAddNewsBlock')"
            @click="openAddNewsBlock"
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
              :ratio="16 / 9"
              v-if="news.imageUrl"
              :src="news.imageUrl"
              spinner-color="primary"
              spinner-size="82px"
              style="border-radius: 10px"
            />
          </div>
          <q-card-section class="col">
            <q-btn
              no-caps
              color="light-green-6"
              :label="`${news.author.userInfo.firstName} ${news.author.userInfo.lastName}`"
              @click="checkAuthorInfo(news.author)"
            />
            <div class="text-h5 text-gray q-mt-md">
              {{ news.title || t("notSpecifiedText") }}
            </div>
            <div class="text-subtitle2 q-mt-sm">
              <p>{{ news.description || t("notSpecifiedText") }}</p>
            </div>
            <q-card-actions class="row q-gutter-sm text-center">
              <div class="col">
                <q-btn
                  color="green-2"
                  class="text-green-8"
                  no-caps
                  :label="t('newsPage.editNews')"
                  style="width: 100%"
                  @click="openEditPage(news.id)"
                />
              </div>
              <div class="col">
                <q-btn
                  color="red-8"
                  no-caps
                  class="text-red-2"
                  :label="t('newsPage.deleteNews')"
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
                      <span class="infoHeadline">{{ t("fullNameText") }}</span>
                      <p class="infoStyle">
                        {{
                          news.author.userInfo.firstName ||
                          t("notSpecifiedText")
                        }}
                        {{
                          news.author.userInfo.lastName || t("notSpecifiedText")
                        }}
                      </p>
                    </div>
                    <div class="col">
                      <span class="infoHeadline">{{ t("phoneNumber") }}</span>
                      <p class="infoStyle">
                        {{
                          news.author.userInfo.phone || t("notSpecifiedText")
                        }}
                      </p>
                    </div>
                  </section>
                  <section class="row q-gutter-sm">
                    <div class="col">
                      <span class="infoHeadline">{{ t("ratingText") }}</span>
                      <p class="infoStyle">
                        {{ news.author.userInfo.rating }}
                      </p>
                    </div>
                    <div class="col">
                      <span class="infoHeadline">{{ t("ageText") }}</span>
                      <p class="infoStyle">
                        {{ news.author.userInfo.age || t("notSpecifiedText") }}
                      </p>
                    </div>
                  </section>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" v-close-popup />
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
    <AddNews
      :isOpenAddNewsBlock="Boolean(isOpenAddNewsBlock)"
      @closeAddNewsBlock="closeAddNewsBlock"
    />
  </div>
</template>

<script setup>
import { all } from "axios";
import { Cookies, useQuasar } from "quasar";
import axios from "axios";
import AddNews from "src/components/News/AddNews.vue";
import EditNews from "src/components/News/EditNews.vue";
import { deleteMethod } from "src/composables/apiMethod/delete";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { useI18n } from "vue-i18n";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const humanResources = proxy.$humanResources;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const $q = useQuasar();
const { t } = useI18n();

const allNews = ref([]);

const getAllNews = async (page) => {
  try {
    // или где ты его хранишь

    await getMethod(
      serverURL,
      `news/allNews?page=${page}&size=${maxNumberOfRequestPerPage}`,
      allNews,
      $q,
      "Error: "
    );
    console.log(allNews.value);

    // Загружаем изображения для каждой новости
    for (const item of allNews.value.data) {
      try {
        const imageUrl = `${serverURL}news/${item.id}/image`;

        const imageRes = await axios.get(imageUrl, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          responseType: "blob",
        });

        item.imageUrl = URL.createObjectURL(imageRes.data);
      } catch (err) {
        console.error(err);
        console.warn(`Не удалось загрузить изображение для новости ${item.id}`);
        item.imageUrl = null;
      }
    }
  } catch (error) {
    console.error("Ошибка при получении новостей:", error);
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

const isOpenAddNewsBlock = ref(false);
const openAddNewsBlock = () => {
  isOpenAddNewsBlock.value = true;
};

const closeAddNewsBlock = () => {
  isOpenAddNewsBlock.value = false;
};

onMounted(() => {
  getAllNews(1);
  redirectToUser();
});
</script>

<style></style>
