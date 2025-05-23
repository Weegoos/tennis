// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  const serverURL = "http://localhost:8000/api/v1/";
  const clientURL = "http://localhost:9000/#/";
  const humanResources = "ORGANIZATOR";
  const adminRole = "ADMIN";
  const maxNumberOfRequestPerPage = 9;
  const statusForUser = true;
  const statusForAdmin = false;
  const completedMatchStatus = "COMPLETED";

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$humanResources = humanResources;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxNumberOfRequestPerPage =
    maxNumberOfRequestPerPage;
  app.config.globalProperties.$statusForAdmin = statusForAdmin;
  app.config.globalProperties.$statusForUser = statusForUser;
  app.config.globalProperties.$adminRole = adminRole;
  app.config.globalProperties.$completedMatchStatus = completedMatchStatus;
};
