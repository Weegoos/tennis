<template>
  <div
    data-testid="parallaxTestID"
    v-for="(item, index) in textForParallax"
    :key="index"
  >
    <q-parallax data-testid="parallaxContainer">
      <template v-slot:media>
        <img :src="item.img" />
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute-full text-center flex flex-center column"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: scope.percentScrolled * 40 + '%',
            left: 0,
            right: 0,
            transition: 'top 0.3s ease, opacity 0.3s ease',
          }"
        >
          <section
            class="q-pa-md"
            style="max-width: 95vw; word-break: break-word"
          >
            <q-icon :name="item.icon" color="white" size="60px" />
            <div class="text-h3 text-white text-bold text-center q-mt-sm">
              {{ item.text }}
            </div>
            <div class="text-body1 text-white text-center q-mt-sm">
              {{ item.caption }}
            </div>
          </section>
        </div>
      </template>
    </q-parallax>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// globalVariables
const { t } = useI18n();

const textForParallax = [
  {
    icon: "mdi-star-circle",
    img: "https://images.unsplash.com/photo-1519611103964-90f61a50d3e6?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: t("indexPage.parallaxPage.block1.text"),
  },
  {
    icon: "mdi-account-check",
    img: "https://images.unsplash.com/photo-1627314387807-df615e8567de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: t("indexPage.parallaxPage.block2.text"),
    caption: t("indexPage.parallaxPage.block2.caption"),
  },
  {
    icon: "mdi-chart-line",
    img: "https://images.unsplash.com/photo-1448743133657-f67644da3008?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: t("indexPage.parallaxPage.block3.text"),
    caption: t("indexPage.parallaxPage.block3.caption"),
  },
  {
    icon: "mdi-account-group",
    img: "https://images.unsplash.com/photo-1661474973381-130596c650c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: t("indexPage.parallaxPage.block4.text"),
    caption: t("indexPage.parallaxPage.block4.caption"),
  },
  {
    icon: "mdi-briefcase-search",
    img: "https://images.unsplash.com/photo-1628617716354-5bdc769a3484?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: t("indexPage.parallaxPage.block5.text"),
    caption: t("indexPage.parallaxPage.block5.caption"),
  },
];
</script>

<style></style>
