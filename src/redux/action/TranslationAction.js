// @flow

import { connect } from "react-redux";
import * as ActionTypes from "./ActionTypes";
import type { TranslationType } from "../reducer/TranslationReducer";
import type { ReducerStateType } from "../reducer";

export type TranslationStateType = {
  translationState: TranslationType
}

export type TranslationActionType = {
  translateChange: (language:string) => void,
  translateLoad: () => void
}

type State = any;

export const languageChange = (languageCode:string) => ({
  action: ActionTypes.TRANSLATION_STORE,
  param: languageCode
});

export const load = ({
  action: ActionTypes.TRANSLATION_REQUEST
})

export const mapDispatchToProps = (dispatch:any):TranslationActionType => ({
  translateChange: (languageCode:string) => {
    dispatch(languageChange(languageCode));
  },
  translateLoad: () => {
    dispatch(load);
  }
});

export const mapStateToProps = (state:ReducerStateType):TranslationStateType => ({
  translationState: state.translationReducer
})
