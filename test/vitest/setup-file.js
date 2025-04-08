import { vi, beforeEach } from "vitest";

// This file will be run before each test file
beforeEach(() => {
  vi.mock("src/boot/config.js", () => ({
    serverURL: "https://csia-back.onrender.com/",
    clientURL: "http://localhost:9000/#/",
    maxItemsPerPage: 10,
    mobileWidth: 800,
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
        getUserProfile: vi.fn(),
        getCity: vi.fn(),
        getCategory: vi.fn(),
        getLanguage: vi.fn(),
        getGender: vi.fn(),
        getService: vi.fn(),
        setNumber: vi.fn(),

        userData: {
          email: "test@example.com",
          userInfo: {
            firstName: "Test",
            lastName: "User",
          },
        },
      })),
    };
  });
});
