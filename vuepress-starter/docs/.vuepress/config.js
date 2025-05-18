import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "en-US",

  title: "Tennis.kz",
  description: "Разработка системы для организации теннисных турниров ",

  theme: defaultTheme({
    logo: "/images/docs/tennis-logo-round.png",

    navbar: ["/", "/get-started"],
  }),

  bundler: viteBundler(),
});
