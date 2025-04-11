import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import IndexPage from "../../../../src/pages/IndexPage.vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../src/i18n/en-US/index";
installQuasarPlugin();

const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

describe("tests for IndexPage.vue", () => {
  const wrapper = mount(IndexPage, {
    global: {
      plugins: [Quasar, pinia, i18n],
    },
  });

  it("should find carousel data-testid", () => {
    const carousel = wrapper.find('[data-testid="carousel"]');
    expect(carousel.exists()).toBe(true);
  });

  it("should find carouselSlide data-testid", () => {
    const carouselSlide = wrapper.find('[data-testid="carouselSlide"]');
    expect(carouselSlide.exists()).toBe(true);
  });

  it("should find tournamentPage data-testid", () => {
    const tournamentPage = wrapper.find('[data-testid="tournamentPage"]');
    expect(tournamentPage.exists()).toBe(true);
  });

  it("should find achievementsPage data-testid", () => {
    const achievementsPage = wrapper.find('[data-testid="achievementsPage"]');
    expect(achievementsPage.exists()).toBe(true);
  });

  it("should find parallaxPage data-testid", () => {
    const parallaxPage = wrapper.find('[data-testid="parallaxPage"]');
    expect(parallaxPage.exists()).toBe(true);
  });
});
