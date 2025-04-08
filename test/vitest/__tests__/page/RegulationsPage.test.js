import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import RegulationsPage from "src/pages/RegulationsPage.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin();

describe("tests for RegulationsPage.vue", () => {
  const wrapper = mount(RegulationsPage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find wrapperDataTestID data-testid", () => {
    const wrapperDataTestID = wrapper.find('[data-testid="wrapperDataTestID"]');
    expect(wrapperDataTestID.exists()).toBe(true);
  });
  it("should find tournamentCard data-testid", () => {
    const tournamentCard = wrapper.find('[data-testid="tournamentCard"]');
    expect(tournamentCard.exists()).toBe(true);
  });
  it("should find tournamentCardSection data-testid", () => {
    const tournamentCardSection = wrapper.find(
      '[data-testid="tournamentCardSection"]'
    );
    expect(tournamentCardSection.exists()).toBe(true);
  });
});
