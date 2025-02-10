import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import axios from "src/boot/axios";
import AdminAllUsers from "src/pages/Admin/AdminAllUsers.vue";
import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";

installQuasarPlugin();
vi.mock("axios");

let data = [
  {
    id: 1,
    email: "batyr.ashim05@mail.ru",
    userInfo: {
      gender: null,
      firstName: "Batyr",
      lastName: "Ashim",
      phone: null,
      rating: null,
    },
    role: "ADMIN",
    description: null,
  },
];

describe("Tests for AdminAllUsers", async () => {
  const wrapper = mount(AdminAllUsers, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should check the rowsID redrawing", async () => {
    wrapper.vm.rows = data;
    await wrapper.vm.$nextTick();
    await flushPromises();

    const rows = wrapper.find('[data-testid="rowsID"]');
    expect(rows.exists()).toBe(true);
  });

  it("should check the userTable redrawing", () => {
    const userTable = wrapper.find('[data-testid="userTable"]');
    expect(userTable.exists()).toBe(true);
  });

  it("should check the data", async () => {
    expect(data[0].email).not.toBeNull();
    expect(data[0].role).not.toBeNull();
    expect(data[0].userInfo.firstName).not.toBeNull();
    expect(data[0].userInfo.lastName).not.toBeNull();
  });

  it("should  check if the content will change", async () => {
    const userData = data[0];
    userData.email = "example@gmail.com";
    userData.role = "USER";
    userData.userInfo.firstName = "Aidos";
    userData.userInfo.lastName = "Khabassov";

    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(userData.email).toBe("example@gmail.com");
    expect(userData.role).toBe("USER");
    expect(userData.userInfo.firstName).toBe("Aidos");
    expect(userData.userInfo.lastName).toBe("Khabassov");
  });

  it("should check the case when data is null", async () => {
    wrapper.vm.rows = [];
    await wrapper.vm.$nextTick();
    await flushPromises();

    const rowsID = wrapper.find('[data-testid="rowsID"]');
    expect(rowsID.exists()).toBe(false);
  });
});
