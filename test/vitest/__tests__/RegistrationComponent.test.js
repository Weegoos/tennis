import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import RegistrationPage from "src/pages/RegistrationPage.vue";
import { useNotifyStore } from "src/stores/notify-store";
import { describe, it, vi } from "vitest";
import { computed } from "vue";

installQuasarPlugin();

vi.mock("src/stores/notify-store", () => ({
  useNotifyStore: vi.fn(() => ({
    nofifySuccess: vi.fn(() => console.log("nofifySuccess is called")),
    notifyError: vi.fn(() => console.log("notifyError is called")),
    loading: vi.fn(() => console.log("loading is called")),
  })),
}));

describe("Tests for Registration Page", () => {
  const pinia = createPinia();
  const wrapper = mount(RegistrationPage, {
    global: {
      plugins: [Quasar, pinia],
    },
  });
  it("should check the content", () => {});
});
