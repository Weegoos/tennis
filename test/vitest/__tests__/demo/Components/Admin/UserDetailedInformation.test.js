import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import UserDetailedInformation from "src/components/Admin/UserDetailedInformation.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin();

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

describe("Tests for UserDetailedInformation", () => {
  const wrapper = mount(UserDetailedInformation, {
    global: {
      plugins: [Quasar],
    },
    props: {
      userInfo: data,
    },
  });
  it("should check the dialogID redrawing", async () => {
    const dialogID = wrapper.findComponent('[data-testid="dialogID"]');
    expect(dialogID.exists()).toBe(false);
  });
  it("should check the userInfo prop", async () => {
    expect(wrapper.props().userInfo).not.toBeNull();
    expect(wrapper.props().userInfo).toBeTypeOf("object");
    await wrapper.setProps({ userInfo: null });
    expect(wrapper.props().userInfo).toBeNull();
  });
});
