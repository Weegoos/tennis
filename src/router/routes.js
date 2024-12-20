const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/registration",
    component: () => import("pages/RegistrationPage.vue"),
  },
  {
    path: "/authorization",
    component: () => import("pages/AuthPage.vue"),
  },
  {
    path: "/tournaments",
    component: () => import("pages/TournamentsPage.vue"),
  },
  {
    path: "/regulations",
    component: () => import("pages/RegulationsPage.vue"),
  },
  {
    path: "/ratings",
    component: () => import("pages/RatingsPage.vue"),
  },
  {
    path: "/media-library",
    component: () => import("pages/MediaLibraryPage.vue"),
  },
  {
    path: "/news",
    component: () => import("pages/NewsPage.vue"),
  },
  {
    path: "/about",
    component: () => import("pages/AboutPage.vue"),
  },
  {
    path: "/profile",
    component: () => import("pages/ProfilePage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
