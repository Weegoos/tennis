import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar, useQuasar } from "quasar";
import AuthPage from "src/pages/AuthPage.vue";
import { describe, expect, it, vi } from "vitest";

installQuasarPlugin();
const $q = useQuasar();

vi.mock("axios");
vi.mock("vue-router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("quasar", async () => {
  const actual = await vi.importActual("quasar");
  return {
    ...actual,
    Cookies: {
      get: vi.fn(() => "mocked_cookie_value"),
      set: vi.fn(),
      remove: vi.fn(),
      has: vi.fn(),
    },
    useQuasar: vi.fn(() => ({
      screen: { width: 800 },
      loading: {
        show: vi.fn(),
        hide: vi.fn(),
      },
    })),
  };
});

vi.mock("src/stores/notify-store", () => ({
  useNotifyStore: vi.fn(() => ({
    nofifySuccess: vi.fn(),
    notifyError: vi.fn(),
    loading: vi.fn(),
  })),
}));

describe("Tests for AuthPageComponent", () => {
  const pinia = createPinia();
  const wrapper = mount(AuthPage, {
    global: {
      plugins: [pinia, Quasar],
    },
  });
  it("should check the content", () => {
    const authorizationContent = wrapper.find(
      '[data-testid="authorizationContent"]'
    );
    expect(authorizationContent.exists()).toBe(true);
    expect(authorizationContent).not.toBeNull();
  });

  it.concurrent("should check the email input", async () => {
    const emailInput = wrapper.find('[data-testid="emailInput"]');
    expect(emailInput.exists()).toBe(true);
    expect(emailInput).not.toBeUndefined();

    await emailInput.setValue("example@gmail.com");
    expect(emailInput.element.value).toBe("example@gmail.com");
  });

  it.concurrent("should check the password input", async () => {
    const passwordInput = wrapper.find('[data-testid="passwordInput"]');
    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput).not.toBeUndefined();

    await passwordInput.setValue("example@gmail.com");
    expect(passwordInput.element.value).toBe("example@gmail.com");
  });

  it("should check the authorization button", async () => {
    const authorizationButton = wrapper.find(
      '[data-testid="authorizationButton"]'
    );
    expect(authorizationButton.exists()).toBe(true);

    await authorizationButton.trigger("click");
  });
});
