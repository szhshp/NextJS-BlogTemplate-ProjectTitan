import { useTranslater } from "hooks/translator";

/**
 * @name TranslationString
 * @description Return a string of i18n text
 * @param textKey: the key of translation set, check the attribute name in @file data\locale.ts
 */
export const translationString = ({ textKey }: { textKey: string }): string => {
  const { translate, locale } = useTranslater();

  return locale[textKey]
    ? translate(locale[textKey])
    : `[ERROR! TRANSLATE {${textKey}} FAILED IN Translation.tsx]`;
};

/**
 * @name Translation
 * @description Return a JSX Element of i18n text
 * @param textKey: the key of translation set, check the attribute name in @file data\locale.ts
 *
 * @example: <Translation textKey="noCommentForPost" />
 */
export const Translation = ({ textKey }: { textKey: string }): JSX.Element => (
  <>{translationString({ textKey })}</>
);
