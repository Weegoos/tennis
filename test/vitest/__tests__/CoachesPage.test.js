import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import CoachesPage from "src/pages/CoachesPage.vue";
import { describe, it, vi } from "vitest";

installQuasarPlugin();

vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

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

describe("Tests for CoachesPage", () => {
  const pinia = createPinia();
  const wrapper = mount(CoachesPage, {
    global: {
      plugins: [pinia, Quasar],
    },
  });
  it("", async () => {});
});
