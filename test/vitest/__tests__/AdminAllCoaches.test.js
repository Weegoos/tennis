import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import AdminAllCoaches from "src/pages/Admin/AdminAllCoaches.vue";
import { describe, it, vi } from "vitest";

installQuasarPlugin();

vi.mock("quasar", async () => {
  const actual = await vi.importActual("quasar");
  return {
    ...actual,
    useQuasar: () => ({
      loading: {
        show: vi.fn(),
        hide: vi.fn(),
      },
    }),
  };
});

vi.mock("src/stores/notify-store", () => ({
  useNotifyStore: vi.fn(() => ({
    notifySuccess: vi.fn(),
    notifyError: vi.fn(),
    loading: vi.fn(() => ({
      hide: vi.fn(),
    })),
  })),
}));

vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

describe("Tests for AdminAllCoaches", () => {
  const pinia = createPinia();
  const wrapper = mount(AdminAllCoaches, {
    global: {
      plugins: [pinia, Quasar],
    },
  });
  it("", () => {});
});
