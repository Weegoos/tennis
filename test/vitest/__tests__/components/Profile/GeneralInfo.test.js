import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import { Quasar } from "quasar";
import GeneralInfo from "src/components/Profile/GeneralInfo.vue";
import { describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../../src/i18n/en-US/index";
import { nextTick } from "vue";

// Устанавливаем Quasar Plugin
installQuasarPlugin();

// Создаем i18n
const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

describe("tests for GeneralInfo.vue", () => {
  const wrapper = shallowMount(GeneralInfo, {
    global: {
      plugins: [Quasar, i18n],
    },
  });

  it("should find wrapperDiv data-testid", () => {
    const wrapperDiv = wrapper.find('[data-testid="wrapperDiv"]');
    expect(wrapperDiv.exists()).toBe(true);
  });

  it("should find wrapperTabs data-testid", () => {
    const wrapperTabs = wrapper.find('[data-testid="wrapperTabs"]');
    expect(wrapperTabs.exists()).toBe(true);
  });
});
