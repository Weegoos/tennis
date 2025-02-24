import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import AdminAllCoaches from "src/pages/Admin/AdminAllCoaches.vue";
import { describe, expect, it, vi } from "vitest";

installQuasarPlugin();

const data = [
  {
    id: 1,
    user: {
      gender: null,
      firstName: "Batyr",
      lastName: "Ashim",
      phone: null,
      rating: null,
      age: null,
    },
    enabled: false,
    city: "ASTANA",
    language: "string",
    cost: 0,
    service: "string",
    description: "string",
    experience: 0,
    stadium: "string",
    createdAt: [2025, 2, 19, 6, 22, 43, 880642000],
  },
];

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
  it("should test the rowsID data-testid redrawing", async () => {
    expect(data).not.toBeNull();
    expect(data.length).toBeGreaterThan(0);
    wrapper.vm.rows = data;
    await wrapper.vm.$nextTick();
    await flushPromises();
    const rowsID = wrapper.findComponent('[data-testid="rowsID"]');
    expect(rowsID.exists()).toBe(true);
  });
});
