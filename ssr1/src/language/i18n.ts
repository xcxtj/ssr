import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";

export const createSSRI18n = () => {
  return createI18n({
    legacy:false,
    locale: "zh", //默认语言
    messages: {
      zh,
      en,
    },
  });
};
