import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import CoachesPage from "src/pages/CoachesPage.vue";
import { describe, expect, it, vi } from "vitest";

installQuasarPlugin();

const data = [
  {
    id: 1,
    user: {
      gender: "FEMALE",
      firstName: "Batyr",
      lastName: "Ashim",
      phone: "87751216514",
      rating: 2.5,
      age: 8,
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
  it("should check the coaches data-testid redrawing", async () => {
    expect(data).not.toBeNull();

    wrapper.vm.coaches = data;
    await flushPromises();
    const coachesID = wrapper.find('[data-testid="coachesID"]');
    expect(coachesID.exists()).toBe(true);

    expect(data[0].user.age).toBeTypeOf("number");
    expect(data[0].user.age).not.toBeNull();

    expect(data[0].user.firstName).not.toBeNull();
    expect(data[0].user.firstName).toBeTypeOf("string");

    expect(data[0].user.gender).not.toBeNaN();
    expect(data[0].user.gender).toBeTypeOf("string");

    expect(data[0].user.lastName).not.toBeNull();
    expect(data[0].user.lastName).toBeTypeOf("string");

    expect(data[0].user.phone).not.toBeNull();
    expect(data[0].user.phone).toBeTypeOf("string");

    expect(data[0].user.rating).not.toBeNaN();
    expect(data[0].user.rating).toBeTypeOf("number");
  });

  it("should the buttonSection data-testid redrawing", async () => {
    const buttonSection = wrapper.find('[data-testid="buttonSection"]');
    expect(buttonSection.exists()).toBe(true);
  });
});
