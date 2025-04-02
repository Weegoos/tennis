// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  const serverURL = "http://localhost:8000/api/v1/";
  const clientURL = "http://localhost:9000/#/";
  const humanResources = "HR";
  const adminRole = "ADMIN";
  const maxNumberOfRequestPerPage = 10;
  const statusForUser = true;
  const statusForAdmin = false;

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$humanResources = humanResources;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxNumberOfRequestPerPage =
    maxNumberOfRequestPerPage;
  app.config.globalProperties.$statusForAdmin = statusForAdmin;
  app.config.globalProperties.$statusForUser = statusForUser;
  app.config.globalProperties.$adminRole = adminRole;
};
