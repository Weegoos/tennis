import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import TournamentsPage from "src/pages/TournamentsPage.vue";
import { describe, expect, it, vi } from "vitest";

installQuasarPlugin();

const data = {
  content: [
    {
      id: 7,
      description: "1",
      startDate: "2025-02-19",
      endDate: "2025-02-19",
      startTime: "14:30",
      category: "SINGLES_MALE",
      maxParticipants: 0,
      location: "string",
      city: "ASTANA",
      minLevel: 0,
      maxLevel: 0,
      cost: 0,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalElements: 11,
  totalPages: 2,
  last: false,
  numberOfElements: 10,
  size: 10,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true,
  },
  first: true,
  empty: false,
};

const $q = {
  loading: {
    hide: vi.fn(),
  },
};

vi.mock("quasar", async () => {
  const actual = await vi.importActual("quasar"); // Импортируем реальные методы Quasar
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

vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

vi.mock("src/stores/notify-store", () => ({
  useNotifyStore: vi.fn(() => ({
    notifySuccess: vi.fn(),
    notifyError: vi.fn(),
    loading: vi.fn(() => ({
      hide: vi.fn(),
    })),
  })),
}));

describe("Tests for TournamentsPage", () => {
  const pinia = createPinia();
  const wrapper = mount(TournamentsPage, {
    global: {
      plugins: [Quasar, pinia],
    },
  });
  it("", () => {
    const openAddTournamentsButton = wrapper.find(
      '[data-testid="openAddTournamentsButton"]'
    );
    expect(openAddTournamentsButton.exists()).toBe(true);
  });
});
