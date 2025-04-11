import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import ParallaxPage from "src/components/IndexPage/ParallaxPage.vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../../src/i18n/en-US/index";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

describe("tests for ParallaxPage.vue", () => {
  const wrapper = mount(ParallaxPage, {
    global: {
      plugins: [Quasar, i18n],
    },
  });

  it("should find parallaxTestID data-testid", () => {
    const parallaxTestID = wrapper.find('[data-testid="parallaxTestID"]');
    expect(parallaxTestID.exists()).toBe(true);
  });

  it("should find parallaxContainer data-testid", () => {
    const parallaxContainer = wrapper.find('[data-testid="parallaxContainer"]');
    expect(parallaxContainer.exists()).toBe(true);
  });
});
