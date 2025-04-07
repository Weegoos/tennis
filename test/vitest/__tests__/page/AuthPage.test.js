import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import AuthPage from "src/pages/AuthPage.vue";
import { describe, expect, it } from "vitest";
installQuasarPlugin();

describe("tests for AuthPage.vue", () => {
  const wrapper = mount(AuthPage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find authorizationContent data-testid", () => {
    const authorizationContent = wrapper.find(
      '[data-testid="authorizationContent"]'
    );
    expect(authorizationContent.exists()).toBe(true);
    expect(authorizationContent.text()).toContain("Authorization");
    expect(authorizationContent).toMatchSnapshot();
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
