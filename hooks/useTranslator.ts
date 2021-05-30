import { useEffect, useState } from "react";
import { locale } from "data/locale";
import { useRouter } from "next/router";

interface iTranslateProp {
  (translation: { [id: string]: string }, _lang?: string): string;
}

/**
 * @name useTranslator
 * @description A hook returns methods for i18n
 */
export const useTranslator = (): {
  translate: iTranslateProp;
  locale: typeof locale;
  setLanguage: (languageToSet: string) => void;
  getLanguage: () => string;
} => {
  const [lang, setLang] = useState("en");
  const language = ["zh", "en"];
  const router = useRouter();

  /**
   * @name getLanguage
   * @description Get language from browser default setting or local storage
   */
  const getLanguage = (): string => {
    const localStorageLang = localStorage.getItem("lang");
    /* Sometimes navigator language may return zh-CN or en-US, split with '-' and get first elem */
    const defaultLang = (localStorageLang || navigator.language).split("-")[0];
    /* If language not exists then return default */
    return language.indexOf(defaultLang) > -1 ? defaultLang : "zh";
  };

  /**
   * @name setLanguage
   * @description Set the language
   * @param languageToSet
   */
  const setLanguage = (languageToSet: string): void => {
    localStorage.setItem("lang", languageToSet);
    router.reload();
  };

  const translate: iTranslateProp = (translation, _lang): string =>
    translation && translation[_lang || lang]
      ? translation[_lang || lang]
      : "[ERROR! TRANSLATE FAILED: INVALID LOCALE KEY]";

  useEffect(() => {
    setLang(getLanguage());
  }, []);

  return {
    translate,
    locale,
    setLanguage,
    getLanguage,
  };
};
