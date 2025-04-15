<template>
  <section @click="pushToAboutPage">
    <p
      data-testid="achievementText"
      class="text-center text-bold"
      :class="$q.screen.width < mobileWidth ? 'text-h4' : 'text-h3'"
    >
      Meet Founders
    </p>
    <div class="row">
      <section
        v-for="(img, index) in imgList"
        :key="index"
        :ref="(el) => (targets[index] = el)"
        class="q-pa-md col-12 col-sm-6 col-md-4"
      >
        <transition name="slide-right-first">
          <div v-if="visible[index]" class="box">
            <q-img
              style="border-radius: 10px"
              :src="img.img"
              rounded
              :ratio="16 / 11"
              spinner-color="primary"
              spinner-size="82px"
            />
            <p class="text-body1 text-center text-bold">
              {{ img.fio }} - {{ img.role }}
            </p>
          </div>
        </transition>
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import akzhan from "../../assets/team/akzhan.jpg";
import arystanbek from "../../assets/team/arystanbek.jpg";
import batyr from "../../assets/team/batyr.jpeg";
import { useRouter } from "vue-router";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const visible = ref([]); // массив видимости
const targets = []; // просто массив DOM элементов
const router = useRouter();

let observer;

onMounted(() => {
  visible.value = new Array(imgList.length).fill(false);

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = targets.findIndex((el) => el === entry.target);
        if (entry.isIntersecting && index !== -1) {
          visible.value[index] = true;
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  targets.forEach((el) => {
    if (el) observer.observe(el);
  });
});
onBeforeUnmount(() => {
  if (observer && target.value) {
    observer.unobserve(target.value);
  }
});

const pushToAboutPage = () => {
  router.push("/about");
};

const imgList = [
  {
    img: batyr,
    fio: "Batyr Ashim",
    role: "Front-end Developer",
  },
  {
    img: arystanbek,
    fio: "Arystanbek Abuyev",
    role: "Back-end Developer",
  },
  {
    img: akzhan,
    fio: "Akzhan Omir",
    role: "Back-end Developer",
  },
];
</script>

<style scoped>
.slide-right-first-enter-active {
  transition: all 1.5s ease;
}
.slide-right-first-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slide-right-first-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
