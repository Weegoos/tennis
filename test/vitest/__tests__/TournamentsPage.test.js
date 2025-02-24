import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import TournamentsPage from "src/pages/TournamentsPage.vue";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

installQuasarPlugin();

let data = {
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
  it("should check the openAddTournamentsButton data-testid redrawing", () => {
    const openAddTournamentsButton = wrapper.find(
      '[data-testid="openAddTournamentsButton"]'
    );
    expect(openAddTournamentsButton.exists()).toBe(true);
  });

  it("should check the tournamentsID data-testid redrawing", () => {
    expect(data).not.toBeNull();
    expect(data.totalElements).not.toBeNull();
    const tournamentsID = wrapper.find('[data-testid="tournamentsID"]');
    expect(tournamentsID.exists()).toBe(true);
  });

  it("should check the tournamentContent data-testid redrawing", async () => {
    wrapper.vm.tournaments = data;

    await nextTick();
    await flushPromises();
    expect(wrapper.find('[data-testid="tournamentContent"]').exists()).toBe(
      true
    );
    expect(data.content[0].description).not.toBeNull;
    expect(data.content[0].category).not.toBeNull;
    expect(data.content[0].startDate).not.toBeNull;
    expect(data.content[0].endDate).not.toBeNull;
    expect(data.content[0].location).not.toBeNull;
    expect(data.content[0].city).not.toBeNull;
  });

  it("should check the userRole data-testid redrawing", async () => {
    wrapper.vm.userRole = wrapper.vm.humanResources;
    await nextTick();
    await flushPromises();
    const userRoleElement = wrapper.find('[data-testid="userRole"]');
    expect(userRoleElement.exists()).toBe(true);
  });

  it("should check the exploreTournaments data-testid redrawing", async () => {
    const exploreTournaments = wrapper.find(
      '[data-testid="exploreTournaments"]'
    );
    expect(exploreTournaments.exists()).toBe(true);
  });

  it("should check the noInfo data-testid redrawing", async () => {
    wrapper.vm.tournaments = { totalElements: 0, content: [] };
    await nextTick();
    await flushPromises();
    const noInfo = wrapper.find('[data-testid="noInfo"]');
    expect(noInfo.exists()).toBe(true);
  });
});
