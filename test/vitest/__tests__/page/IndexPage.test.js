import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import IndexPage from "src/pages/IndexPage.vue";
import { describe, expect, it } from "vitest";
installQuasarPlugin();

const pinia = createPinia();

describe("tests for IndexPage.vue", () => {
  const wrapper = mount(IndexPage, {
    global: {
      plugins: [Quasar, pinia],
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
});
