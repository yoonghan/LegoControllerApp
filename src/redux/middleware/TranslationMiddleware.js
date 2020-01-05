import * as ActionTypes from "../action/ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';
import {dispatch} from "react-redux";

const TRANSLATION_KEY="@TranslationKey";

export const changeLanguage = (languageCode) => (next) => {
  next({
    type: ActionTypes.TRANSLATION_CHANGE,
    languageCode
  });
}

export const storeLanguageCode = (languageCode) => async (store) => {
  try {
    await AsyncStorage.setItem(TRANSLATION_KEY, languageCode);
  } catch (e) {
    //Not able to store code. Do nothing
    console.warn(e, "error");
  }
  store.dispatch({
    action: ActionTypes.TRANSLATION_CHANGE,
    param: languageCode
  })
}


export const checkStatus = async (next) => {
  let languageCode = "";
  try {
    languageCode = await AsyncStorage.getItem(TRANSLATION_KEY);
  }
  catch(e) {
    //Do nothing, failing.
  }

  next({
    type: ActionTypes.TRANSLATION_CHANGE,
    languageCode: languageCode
  });
}
