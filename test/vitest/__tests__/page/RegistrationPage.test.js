import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import RegistrationPage from "src/pages/RegistrationPage.vue";
import { describe, expect, it } from "vitest";
installQuasarPlugin();

describe("tests for RegistrationPage", () => {
  const wrapper = mount(RegistrationPage, {
    global: {
      plugins: [Quasar],
      mocks: {},
    },
  });
  it("should find registrationContent data-testid", () => {
    const registrationContent = wrapper.find(
      '[data-testid="registrationContent"]'
    );
    expect(registrationContent.exists()).toBe(true);
    expect(registrationContent.text()).toContain("Registration");
    expect(registrationContent).toMatchSnapshot();
  });
  it("should find registrationForm data-testid", () => {
    const nameInput = wrapper.find('[data-testid="nameInput"]');
    expect(nameInput.exists()).toBe(true);

    nameInput.setValue("Example Name");
    expect(nameInput.element.value).toBe("Example Name");
  });
});
