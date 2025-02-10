import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
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
    props: {
      userInfo: data,
    },
  });
  it("should check the userInfo prop", () => {
    expect(wrapper.props().userInfo).not.toBeNull();
  });
});
