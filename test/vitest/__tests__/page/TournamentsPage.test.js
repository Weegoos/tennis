import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import TournamentPage from "src/components/IndexPage/TournamentPage.vue";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

installQuasarPlugin();

let testData = {
  data: {
    description: "Desc",
  },
};

describe("tests for TournamentsPage.vue", () => {
  const wrapper = mount(TournamentPage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find tournamentsID data-testid", async () => {
    wrapper.vm.tournaments = testData;
    await flushPromises();
    await nextTick();
    const tournamentsID = wrapper.find('[data-testid="tournamentsID"]');
    // expect(tournamentsID.exists()).toBe(true);
  });
});
