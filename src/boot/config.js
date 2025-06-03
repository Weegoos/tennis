// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  const serverURL = "https://tennis-p30s.onrender.com/api/v1/";
  const adminURL = "https://tennis-p30s.onrender.com/api/admin/";
  // https://kaz-tennis.netlify.app/#/
  // http://localhost:9000/#/
  // https://localhost/index.html#/
  const clientURL = "https://localhost/index.html#/";
  const humanResources = "ORGANIZATOR";
  const adminRole = "ADMIN";
  const maxNumberOfRequestPerPage = 9;
  const statusForUser = true;
  const statusForAdmin = false;
  const completedMatchStatus = "COMPLETED";

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$adminURL = adminURL;
  app.config.globalProperties.$humanResources = humanResources;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxNumberOfRequestPerPage =
    maxNumberOfRequestPerPage;
  app.config.globalProperties.$statusForAdmin = statusForAdmin;
  app.config.globalProperties.$statusForUser = statusForUser;
  app.config.globalProperties.$adminRole = adminRole;
  app.config.globalProperties.$completedMatchStatus = completedMatchStatus;
};
