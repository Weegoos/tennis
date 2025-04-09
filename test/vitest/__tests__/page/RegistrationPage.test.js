import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import RegistrationPage from "src/pages/RegistrationPage.vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../src/i18n/en-US/index";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

describe("tests for RegistrationPage", () => {
  const wrapper = mount(RegistrationPage, {
    global: {
      plugins: [Quasar, i18n],
      mocks: {},
    },
  });
  it("should find registrationContent data-testid", () => {
    const registrationContent = wrapper.find(
      '[data-testid="registrationContent"]'
    );
    expect(registrationContent.exists()).toBe(true);
  });

  it("should find carouselTestID data-testid", () => {
    const carouselTestID = wrapper.find('[data-testid="carouselTestID"]');
    expect(carouselTestID.exists()).toBe(false);
  });

  it("should find registrationContent data-testid", () => {
    const registrationContent = wrapper.find(
      '[data-testid="registrationContent"]'
    );
    expect(registrationContent.exists()).toBe(true);
  });

  it("should find inputDiv data-testid", () => {
    const inputDiv = wrapper.find('[data-testid="inputDiv"]');
    expect(inputDiv.exists()).toBe(true);
  });

  it("should find actions data-testid", () => {
    const actions = wrapper.find('[data-testid="actions"]');
    expect(actions.exists()).toBe(true);
  });

  it("should find backgroundText data-testid", () => {
    const backgroundText = wrapper.find('[data-testid="backgroundText"]');
    expect(backgroundText.exists()).toBe(true);
  });

  it("should find nameInput data-testid", () => {
    const nameInput = wrapper.find('[data-testid="nameInput"]');
    expect(nameInput.exists()).toBe(true);

    nameInput.setValue("Example Name");
    expect(nameInput.element.value).toBe("Example Name");
  });

  it("should find emailInput data-testid", () => {
    const secondNameInput = wrapper.find('[data-testid="emailInput"]');
    expect(secondNameInput.exists()).toBe(true);

    secondNameInput.setValue("Example Second Name");
    expect(secondNameInput.element.value).toBe("Example Second Name");
  });

  it("should find emailInput data-testid", () => {
    const emailInput = wrapper.find('[data-testid="emailInput"]');
    expect(emailInput.exists()).toBe(true);

    emailInput.setValue("example@gmail.com");
    expect(emailInput.element.value).toBe("example@gmail.com");
  });
  it("should find passwordInput data-testid", () => {
    const passwordInput = wrapper.find('[data-testid="passwordInput"]');
    expect(passwordInput.exists()).toBe(true);

    passwordInput.setValue("examplePassword");
    expect(passwordInput.element.value).toBe("examplePassword");
  });
});
