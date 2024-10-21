<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      control-color="black"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      arrows
      height="500px"
      class="full-width"
    >
      >
      <q-carousel-slide name="style" class="column full-width">
        <q-img
          src="https://plus.unsplash.com/premium_photo-1708119178787-a9ec69bcd563?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

const slide = ref("style");
const slides = ["style"];
let slideIndex = 0;
let intervalId;

const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length; // Увеличиваем индекс слайда, если последний, возвращаем на первый
  slide.value = slides[slideIndex];
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000); // Переключаем слайды каждые 5 секунд
});

onBeforeUnmount(() => {
  clearInterval(intervalId); // Очищаем интервал перед размонтированием компонента
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
