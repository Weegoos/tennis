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
    <section class="q-mt-md">
      <MeetFounders />
    </section>
    <section class="q-mt-md" data-testid="achievementsPage">
      <AchievementsPage />
    </section>
    <section data-testid="parallaxPage">
      <!-- <ParallaxPage /> -->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import TournamentPage from "../components/IndexPage/TournamentPage.vue";
import AchievementsPage from "../components/IndexPage/AchievementsPage.vue";
import ParallaxPage from "../components/IndexPage/ParallaxPage.vue";
import MeetFounders from "src/components/IndexPage/MeetFounders.vue";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const slide = ref("tennis");
const slides = ["tennis", "advertisement"];
let slideIndex = 0;
let intervalId;

const slideInformation = ref([
  {
    name: "tennis",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "advertisement",
    img: "https://images.unsplash.com/photo-1499510318569-1a3d67dc3976?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]);

const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  slide.value = slides[slideIndex];
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000);
  redirectToUser();
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
