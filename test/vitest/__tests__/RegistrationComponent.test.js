import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Cookies, Quasar, useQuasar } from "quasar";
import RegistrationPage from "src/pages/RegistrationPage.vue";
import { useNotifyStore } from "src/stores/notify-store";
import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { useRouter } from "vue-router";

installQuasarPlugin();
const $q = useQuasar();

vi.mock("axios");

vi.mock("vue-router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("src/stores/notify-store", () => ({
  useNotifyStore: vi.fn(() => ({
    nofifySuccess: vi.fn(),
    notifyError: vi.fn(),
    loading: vi.fn(),
  })),
}));

vi.mock("quasar", async () => {
  const actual = await vi.importActual("quasar");
  return {
    ...actual,
    Cookies: {
      get: vi.fn(() => ""),
      set: vi.fn(),
      remove: vi.fn(),
      has: vi.fn(),
    },
    useQuasar: vi.fn(() => ({
      loading: {
        show: vi.fn(),
        hide: vi.fn(),
      },
    })),
  };
});

describe("Tests for Registration Page", () => {
  const pinia = createPinia();
  const wrapper = mount(RegistrationPage, {
    global: {
      plugins: [Quasar, pinia],
      config: {
        globalProperties: {
          $serverURL: "http://localhost:8000/api/v1/",
        },
      },
    },
  });
  it("should check the content", async () => {
    const registrationText = wrapper.find(
      '[data-testid="registrationContent"]'
    );
    expect(registrationText.exists()).toBe(true);
    expect(registrationText).not.toBe(null);
  });

  it.concurrent("should check the name input", async () => {
    const nameInput = wrapper.find('[data-testid="nameInput"]');
    expect(nameInput.exists()).toBe(true);
    expect(nameInput).not.toBeUndefined();

    await nameInput.setValue("Aisultan");
    expect(nameInput.element.value).toBe("Aisultan");
  });

  it.concurrent("should check the secondName input", async () => {
    const secondNameInput = wrapper.find('[data-testid="secondNameInput"]');
    expect(secondNameInput.exists()).toBe(true);
    expect(secondNameInput).not.toBeUndefined();

    await secondNameInput.setValue("Khabbasov");
    expect(secondNameInput.element.value).toBe("Khabbasov");
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

    await passwordInput.setValue("qwerty123");
    expect(passwordInput.element.value).toBe("qwerty123");
  });

  it("should check the registrationButton", async () => {
    const registrationButton = wrapper.find(
      '[data-testid="registrationButton"]'
    );
    expect(registrationButton.exists()).toBe(true);
    registrationButton.trigger("click");
  });

  it("should successfully register a user", async () => {
    const notifyStore = useNotifyStore();
    axios.post.mockResolvedValue({
      data: {
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken",
      },
    });

    const email = { value: "example@gmail.com" };
    const name = { value: "Aisultan" };
    const secondName = { value: "Khabbasov" };
    const password = { value: "qwerty123" };

    const serverURL = wrapper.vm.$serverURL;

    await wrapper.vm.$nextTick();
    await flushPromises();
    await wrapper.find('[data-testid="registrationButton"]').trigger("click");

    expect(axios.post).toHaveBeenCalledWith(
      `${serverURL}auth/signup`,
      {
        email: email.value,
        firstName: name.value,
        lastName: secondName.value,
        password: password.value,
        role: "USER",
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  });
});
