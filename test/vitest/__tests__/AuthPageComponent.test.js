import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import AuthPage from "src/pages/AuthPage.vue";
import { describe, it, vi } from "vitest";
import { useRouter } from "vue-router";

installQuasarPlugin();

vi.mock("vue-router", () => ({
  useRouter: vi.fn(),
}));

describe("Tests for AuthPageComponent", () => {
  const pinia = createPinia();
  const wrapper = mount(AuthPage, {
    global: {
      plugins: [pinia, Quasar],
    },
  });
  it("", () => {});
});
