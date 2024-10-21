<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      arrows
      height="700px"
      class="full-width"
    >
      >

      <q-carousel-slide
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
        />
      </q-carousel-slide>
    </q-carousel>

    <div class="q-mt-md text-center">
      <p>Текущий слайд: {{ slide }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

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
    img: "https://plus.unsplash.com/premium_photo-1671586882133-cfeb42e6feba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]);

const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  slide.value = slides[slideIndex];
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style>
.full-width {
  width: 100vw; /* Полная ширина экрана */
  max-width: none; /* Убираем ограничение по максимальной ширине */
  margin: 0; /* Убираем отступы */
  padding: 0; /* Убираем внутренние отступы */
}
</style>
