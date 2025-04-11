import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import AchievementsPage from "src/components/IndexPage/AchievementsPage.vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../../src/i18n/en-US/index";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "en-US",
  messages,
});

describe("tests for AchievementsPage.vue", () => {
  const wrapper = mount(AchievementsPage, {
    global: {
      plugins: [Quasar, i18n],
    },
  });
  it("", () => {
    expect(true).toBe(true);
  });
});
