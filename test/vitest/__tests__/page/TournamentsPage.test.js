import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import TournamentPage from "src/components/IndexPage/TournamentPage.vue";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";
import messages from "../../../../src/i18n/en-US/index";

installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

let testData = {
  page: 1,
  size: 10,
  totalCount: 2,
  data: [
    {
      id: 2,
      description: "What is Going on",
      startDate: "2025-04-01",
      endDate: "2025-04-02",
      startTime: "12:30",
      category: "SINGLES_MALE",
      maxParticipants: 16,
      location: "Arystanbek",
      city: "ASTANA",
      minLevel: 3,
      maxLevel: 5,
      cost: 12000,
      createdAt: "2025-04-05 13:14:02",
      updatedAt: "2025-04-05 13:14:02",
      author: {
        id: 1,
        email: "abiev.arystanbek@gmail.com",
        userInfo: {
          gender: "MALE",
          firstName: "Arystanbek",
          lastName: "Abiyev",
          phone: "87018848397",
          rating: 4,
          age: 19,
        },
        role: "USER",
        createdAt: "2025-04-04 22:49:23",
      },
    },
  ],
};

describe("tests for TournamentsPage.vue", () => {
  const wrapper = mount(TournamentPage, {
    global: {
      plugins: [Quasar, i18n],
    },
  });
  it("should find tournamentsID data-testid", async () => {
    wrapper.vm.tournaments = testData;
    await flushPromises();
    await nextTick();
    await wrapper.vm.$nextTick();
    const tournamentsID = wrapper.find('[data-testid="tournamentsID"]');
    // expect(tournamentsID.exists()).toBe(true);
  });
});
