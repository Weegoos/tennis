<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      data-testid="carousel"
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      arrows
      :height="$q.screen.width < mobileWidth ? '300px' : '700px'"
      class="full-width"
    >
      <q-carousel-slide
        data-testid="carouselSlide"
        v-for="(carousel, index) in slideInformation"
        :key="index"
        :name="carousel.name"
        class="column full-width"
      >
        <q-img
          :src="carousel.img"
          :ratio="16 / 9"
          spinner-color="primary"
          spinner-size="82px"
        >
        </q-img>
      </q-carousel-slide>
    </q-carousel>
    <section
      data-testid="tournamentPage"
      :class="$q.screen.width > mobileWidth ? 'q-mt-lg q-pa-xl q-mx-xl' : ''"
    >
      <TournamentPage />
    </section>
    <section>
      <!-- <AchievementsPage /> -->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import TournamentPage from "../components/IndexPage/TournamentPage.vue";
import AchievementsPage from "./AchievementsPage.vue";

import { getCurrentInstance } from "vue";
import { useJavaScriptFunction } from "src/stores/javascript-store";
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const javascriptStore = useJavaScriptFunction();
const slide = ref("tennis");
const slides = ["tennis", "advertisement"];
let slideIndex = 0;
let intervalId;

const slideInformation = ref([
  {
    name: "tennis",
    img: "https://plus.unsplash.com/premium_photo-1708119178787-a9ec69bcd563?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "advertisement",
    img: "https://plus.unsplash.com/premium_photo-1707403688610-4da1c7e47cd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]);

const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  slide.value = slides[slideIndex];
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000);
  javascriptStore.redirect();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style>
.full-width {
  width: 100vw;
  max-width: none;
  margin: 0;
  padding: 0;
}
</style>
