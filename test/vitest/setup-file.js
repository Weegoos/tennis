import { vi, beforeEach } from "vitest";

// This file will be run before each test file
beforeEach(() => {
  vi.mock("src/boot/config.js", () => ({
    serverURL: "https://csia-back.onrender.com/",
    clientURL: "http://localhost:9000/#/",
    maxItemsPerPage: 10,
    mobileWidth: 1050,
  }));

  vi.mock("axios");

  vi.mock("src/stores/notify-store", () => ({
    useNotifyStore: () => ({
      loading: vi.fn(),
      notifyError: vi.fn(),
    }),
  }));
  vi.mock("src/composables/javascript-function/token.js", () => ({
    checkAccessToken: vi.fn(() => true),
  }));

  vi.mock("vue-router", () => {
    return {
      useRoute: () => ({
        params: {},
        query: {},
      }),
      useRouter: () => ({
        push: vi.fn(),
      }),
    };
  });

  vi.mock("src/stores/javascript-store", () => {
    return {
      useJavaScriptFunction: vi.fn(() => ({
        redirect: vi.fn(),
      })),
    };
  });
  vi.mock("src/stores/api-store", () => {
    return {
      useApiStore: vi.fn(() => ({
        getUserProfile: vi.fn().mockResolvedValue({ role: "HR" }),
        getCity: vi.fn(),
        getCategory: vi.fn(),
        getLanguage: vi.fn(),
        getGender: vi.fn(),
        getService: vi.fn(),
        setNumber: vi.fn(),

        userData: {
          email: "test@example.com",
          role: "HR",
          userInfo: {
            firstName: "Test",
            lastName: "User",
          },
        },
      })),
    };
  });

  vi.mock("src/stores/notify-store", async () => {
    return {
      useNotifyStore: () => ({
        loading: vi.fn(),
        notifyError: vi.fn(),
      }),
    };
  });
  vi.mock("src/composables/apiMethod/get.js", () => {
    return {
      getMethod: vi.fn(() => Promise.resolve()),
    };
  });
  vi.mock("src/composables/apiMethod/post.js", () => {
    return {
      postMethod: vi.fn(() => Promise.resolve()),
    };
  });
  vi.mock("src/composables/apiMethod/delete.js", () => {
    return {
      deleteMethod: vi.fn(() => Promise.resolve()),
    };
  });
  vi.mock("src/composables/apiMethod/put.js", () => {
    return {
      putMethod: vi.fn(() => Promise.resolve()),
    };
  });
});
