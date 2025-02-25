// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 800;
  const serverURL = "http://localhost:8000/api/v1/";
  const clientURL = "http://localhost:9000/#/";
  const humanResources = "HR";

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$humanResources = humanResources;
  app.config.globalProperties.$clientURL = clientURL;
};
