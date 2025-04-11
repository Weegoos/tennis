import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import AchievementsPage from "src/components/IndexPage/AchievementsPage.vue";
import { describe, expect, it, test } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../../src/i18n/en-US/index";
import { nextTick } from "vue";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "en-US",
  messages,
});

const testData = [
  {
    name: "Test Data",
    stats: 48,
  },
];

describe("tests for AchievementsPage.vue", () => {
  const wrapper = mount(AchievementsPage, {
    global: {
      plugins: [Quasar, i18n],
    },
  });
  it("should find achievementText data-testid", () => {
    const achievementText = wrapper.find('[data-testid="achievementText"]');
    expect(achievementText.exists()).toBe(true);
  });

  it("should find achievementContainer data-testid", () => {
    const achievementContainer = wrapper.find(
      '[data-testid="achievementContainer"]'
    );
    expect(achievementContainer.exists()).toBe(true);
  });

  it("should find achievementWrapper data-testid", () => {
    const achievementWrapper = wrapper.find(
      '[data-testid="achievementWrapper"]'
    );
    expect(achievementWrapper.exists()).toBe(true);
  });

  it("should find achievementVForContainer data-testid", async () => {
    wrapper.vm.achievements = testData;
    await flushPromises();
    await nextTick();
    const achievementVForContainer = wrapper.find(
      '[data-testid="achievementVForContainer"]'
    );
    expect(achievementVForContainer.exists()).toBe(true);
  });

  it("should find statsText data-testid", async () => {
    expect(testData.stats).not.toBeNull();
    const statsText = wrapper.find('[data-testid="statsText"]');
    expect(statsText.exists()).toBe(true);
  });

  it("should find nameText data-testid", async () => {
    expect(testData.name).not.toBeNull();
    const nameText = wrapper.find('[data-testid="nameText"]');
    expect(nameText.exists()).toBe(true);
  });
});
