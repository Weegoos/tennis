import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import AuthPage from "src/pages/AuthPage.vue";
import { describe, expect, it } from "vitest";
import messages from "../../../../src/i18n/en-US/index";
import { createI18n } from "vue-i18n";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

describe("tests for AuthPage.vue", () => {
  const wrapper = mount(AuthPage, {
    global: {
      plugins: [Quasar, i18n],
    },
    mocks: {
      $q: {
        screen: {
          width: 1200,
        },
      },
    },
  });
  it("should find backgroundText data-testid", async () => {
    const backgroundText = wrapper.find('[data-testid="backgroundText"]');
    expect(backgroundText.exists()).toBe(true);
  });
  it("should find authorizationTitle data-testid", async () => {
    const authorizationTitle = wrapper.find(
      '[data-testid="authorizationTitle"]'
    );
    expect(authorizationTitle.exists()).toBe(true);
  });

  it("should find inputDiv data-testid", () => {
    const inputDiv = wrapper.find('[data-testid="inputDiv"]');
    expect(inputDiv.exists()).toBe(true);
  });

  it("should find actions data-testid", () => {
    const actions = wrapper.find('[data-testid="actions"]');
    expect(actions.exists()).toBe(true);
  });

  it("should find emailInput data-testid", () => {
    const emailInput = wrapper.find('[data-testid="emailInput"]');
    expect(emailInput.exists()).toBe(true);

    emailInput.setValue("Example@gmail.com");
    expect(emailInput.element.value).toBe("Example@gmail.com");
  });

  it("should find passwordInput data-testid", () => {
    const passwordInput = wrapper.find('[data-testid="passwordInput"]');
    expect(passwordInput.exists()).toBe(true);

    passwordInput.setValue("examplePassword");
    expect(passwordInput.element.value).toBe("examplePassword");
  });
});
