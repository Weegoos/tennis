<template>
  <div>
    <q-card
      class="my-card"
      style="
        margin-right: 200px;
        margin-left: 200px;
        margin-top: 50px;
        margin-bottom: 50px;
      "
      v-for="(items, index) in coaches"
      :key="index"
    >
      <q-card-section class="row q-gutter-md">
        <div class="col-2">
          <q-img
            :src="items.img"
            :ratio="10 / 9"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
        <section class="col">
          <div class="text-h4 text-bold">{{ items.name }}</div>
          <div class="text-subtitle1">{{ items.description }}</div>
          <section class="row">
            <div class="col">
              <div class="q-mt-lg">
                <p class="text-body1">
                  <span class="text-bold">Phone number: </span
                  ><span>{{ items.number }}</span>
                </p>
              </div>
            </div>
            <div class="col">
              <div class="q-mt-lg">
                <p class="text-body1">
                  <span class="text-bold">City: </span
                  ><span>{{ items.city }}</span>
                </p>
              </div>
            </div>
          </section>
        </section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import coaches1 from "src/assets/coaches/coaches1.jpg";
import coaches2 from "src/assets/coaches/coaches1.jpg";
import coaches3 from "src/assets/coaches/coaches1.jpg";
import coaches4 from "src/assets/coaches/coaches1.jpg";
import coaches5 from "src/assets/coaches/coaches1.jpg";

const coaches = ref([
  {
    name: "Donier Tadjibekov",
    description: `Work experience of 13 years. Education: higher education (Bachelor's degree, Master's degree from Uzbek State University of Physical Culture and Sports). Participant and prize-winner of city and national tournaments. Experience working with professional ATP players, as well as with ATP and ITF juniors. I work with professional players, children and amateurs of all levels and ages.`,
    number: "87751216510",
    city: "Astana",
    language: "Russian, Kazakh, English",
    img: coaches1, // Замените на соответствующую переменную или путь к изображению
  },
  {
    name: "Aidar Nurmagambetov",
    description: `Professional tennis coach with 10 years of experience. Specializes in training both beginner and intermediate players. Holds a degree in sports science and has worked with several junior players, helping them win local tournaments. Fluent in Kazakh and Russian.`,
    number: "87751216511",
    city: "Almaty",
    language: "Kazakh, Russian",
    img: coaches2, // Замените на соответствующую переменную или путь к изображению
  },
  {
    name: "Olga Petrova",
    description: `With over 15 years of coaching experience, I have worked with both professional athletes and recreational players. I hold certifications in sports psychology and tennis coaching. My approach is focused on developing strong mental skills along with technical proficiency. Fluent in Russian, English, and French.`,
    number: "87751216512",
    city: "Shymkent",
    language: "Russian, English, French",
    img: coaches3, // Замените на соответствующую переменную или путь к изображению
  },
  {
    name: "Sultan Bekmuratov",
    description: `Experienced tennis coach specializing in youth development. I have coached children from the age of 5 to 18 and have helped many of them achieve top rankings in regional competitions. I focus on building a solid technical foundation while ensuring that the players enjoy the process. Fluent in Kazakh and Russian.`,
    number: "87751216513",
    city: "Aktau",
    language: "Kazakh, Russian",
    img: coaches4, // Замените на соответствующую переменную или путь к изображению
  },
  {
    name: "Nina Ivankova",
    description: `Tennis coach with 12 years of experience working with athletes of all levels. I focus on improving players' fitness, agility, and tennis techniques. I have worked with both junior and adult players and have a passion for seeing players grow both mentally and physically. Fluent in Russian and English.`,
    number: "87751216514",
    city: "Karaganda",
    language: "Russian, English",
    img: coaches5, // Замените на соответствующую переменную или путь к изображению
  },
]);
</script>

<style></style>
