import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import ProfilePage from "src/pages/ProfilePage.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin();
const pinia = createPinia();

describe("tests for ProfilePage.vue", () => {
  const wrapper = shallowMount(ProfilePage, {
    global: {
      plugins: [Quasar, pinia],
    },
  });
  it("should find profileContent data-testid", () => {
    const profileContent = wrapper.find('[data-testid="profileContent"]');
    expect(profileContent.exists()).toBe(true);
  });
});
