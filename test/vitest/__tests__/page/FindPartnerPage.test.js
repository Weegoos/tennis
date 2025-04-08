import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { Quasar } from "quasar";
import ProfilePage from "src/pages/ProfilePage.vue";
import { describe, it } from "vitest";

installQuasarPlugin();

describe("tests for ProfilePage.vue", () => {
  const wrapper = shallowMount(ProfilePage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find findPartner data-testid", () => {});
});
