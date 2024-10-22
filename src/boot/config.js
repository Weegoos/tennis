// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 800;

  app.config.globalProperties.$mobileWidth = mobileWidth;
};
