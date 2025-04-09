import { createI18n } from "vue-i18n";
import messages from "../i18n/en-US/index";

export default ({ app }) => {
  // Create I18n instance
  const savedLocale = localStorage.getItem("locale") || "en-US";
  const i18n = createI18n({
    locale: savedLocale,
    legacy: false, // comment this out if not using Composition API
    messages,
  });

  // Tell app to use the I18n instance
  app.use(i18n);
};
