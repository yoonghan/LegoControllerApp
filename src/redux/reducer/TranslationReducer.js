// @flow

import React from 'react';
import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import * as Actions from "../action/ActionTypes";
import { translate } from "../../util/tools";
import i18n from "i18n-js";

export type TranslationType = {
  locale: string,
  translate: () => string
}

export type ActionType = {
  type: string,
  languageCode: string
};


const LANGUAGE_FALLBACK = { languageTag: "en", isRTL: false };

const translationGetters = {
  en: () => require("../../translation/en.json"),
  my: () => require("../../translation/my.json")
};

export const changeLanguage = (languageCode:string):TranslationType => {
  return {
    locale: setI18nConfig(getCode(languageCode)),
    translate: translate
  };
}

const getCode = (languageCode:string) => {
  switch(languageCode) {
    case "my":
      return { languageTag: "my", isRTL: false };
    case "en":
      return { languageTag: "en", isRTL: false };
    default:
      const { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        LANGUAGE_FALLBACK;
      return { languageTag, isRTL };
  }
}

const setI18nConfig = ({ languageTag, isRTL }) => {
  translate.cache.clear();
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
  return languageTag;
};

const initial = changeLanguage("");

const TranslationReducer = (state:TranslationType = initial, action:ActionType) => {
  switch(action.type) {
    case Actions.TRANSLATION_CHANGE:
      const changedLanguage = changeLanguage(action.languageCode);
      return {
        ...state,
        ...changedLanguage
      }
    default:
      return state;
  }
}

export default TranslationReducer;
