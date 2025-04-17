import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import { Quasar } from "quasar";
import FindPartnerPage from "src/pages/FindPartnerPage.vue";
import ProfilePage from "src/pages/ProfilePage.vue";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import messages from "../../../../src/i18n/en-US/index";
import { createI18n } from "vue-i18n";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

let testData = {
  page: 1,
  size: 10,
  totalCount: 1,
  data: [
    {
      id: 1,
      phone: "87751216514",
      firstName: "Batyr",
      lastName: "Ashim",
      rating: 3,
      enabled: true,
      city: "ASTANA",
      stadium: "ASTANA",
      description: "ASTANA",
      createdAt: "2025-04-08 10:18:17",
      updatedAt: null,
    },
  ],
};

describe("tests for FindPartner.vue", () => {
  const wrapper = shallowMount(FindPartnerPage, {
    global: {
      plugins: [Quasar, i18n],
      config: {
        globalProperties: {
          $humanResources: "HR",
        },
      },
      stubs: ["q-btn"],
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
  });

  it("should find partnerDataTestID data-testid", async () => {
    wrapper.vm.partner = testData;
    await flushPromises();
    await nextTick();
    const partnerDataTestID = wrapper.find('[data-testid="partnerDataTestID"]');
    expect(partnerDataTestID.exists()).toBe(true);
  });

  it("should find partnerID data-testid", async () => {
    wrapper.vm.partner = testData;
    await flushPromises();
    await nextTick();
    const partnerID = wrapper.find('[data-testid="partnerID"]');
    expect(partnerID.exists()).toBe(true);
  });

  it("should find buttonSection data-testid", async () => {
    await flushPromises();
    await wrapper.vm.$nextTick();

    wrapper.vm.userInfo.value = { role: "HR" };

    await flushPromises();
    await wrapper.vm.$nextTick();

    await wrapper.vm.$nextTick();
    const buttonSection = wrapper.find('[data-testid="buttonSection"]');
    expect(buttonSection.exists()).toBe(false);
  });

  it("should find partnerNoData data-testid", async () => {
    wrapper.vm.partner = 0;

    await flushPromises();
    await wrapper.vm.$nextTick();

    const partnerNoData = wrapper.find('[data-testid="partnerNoData"]');
    const partnerID = wrapper.find('[data-testid="partnerID"]');
    expect(partnerNoData.exists()).toBe(true);
    expect(partnerID.exists()).toBe(false);
  });
});
