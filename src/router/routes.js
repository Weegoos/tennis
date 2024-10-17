const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
