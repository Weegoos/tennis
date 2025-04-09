import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { Quasar } from "quasar";
import GeneralInfo from "src/components/Profile/GeneralInfo.vue";
import { describe, it } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../../src/i18n/en-US/index";
installQuasarPlugin();

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
  it("", () => []);
});
