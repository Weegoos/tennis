import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { Quasar } from "quasar";
import FindPartnerPage from "src/pages/FindPartnerPage.vue";
import ProfilePage from "src/pages/ProfilePage.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin();

describe("tests for FindPartner.vue", () => {
  const wrapper = shallowMount(FindPartnerPage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find findPartner data-testid", () => {
    const findPartner = wrapper.find('[data-testid="findPartner"]');
    expect(findPartner.exists()).toBe(true);
  });

  it("should find findPartnerContent data-testid", () => {
    const findPartnerContent = wrapper.find(
      '[data-testid="findPartnerContent"]'
    );
    expect(findPartnerContent.exists()).toBe(true);
    expect(findPartnerContent.text()).toContain("Find");
    expect(findPartnerContent).toMatchSnapshot();
  });
});
