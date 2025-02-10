import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import axios from "src/boot/axios";
import AdminAllUsers from "src/pages/Admin/AdminAllUsers.vue";
import { describe, it, vi } from "vitest";

installQuasarPlugin();
vi.mock("axios");

describe("Tests for AdminAllUsers", async () => {
  const wrapper = mount(AdminAllUsers, {
    global: {
      plugins: [Quasar],
    },
  });
  it("", () => {});
});
