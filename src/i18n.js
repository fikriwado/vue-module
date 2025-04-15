import { createI18n } from "vue-i18n";
import { i18n as locales } from "./registerModules";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: locales,
});

export default i18n;
