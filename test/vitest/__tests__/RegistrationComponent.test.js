import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import RegistrationPage from "src/pages/RegistrationPage.vue";
import { describe, it, vi } from "vitest";

installQuasarPlugin();

describe("Tests for Registration Page", () => {
  it("Check the content", () => {});
});
