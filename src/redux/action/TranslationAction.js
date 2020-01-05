import {connect} from "react-redux";
import * as ActionTypes from "./ActionTypes";

export const languageChange = (languageCode) => ({
  action: ActionTypes.TRANSLATION_STORE,
  param: languageCode
});

export const load = ({
  action: ActionTypes.TRANSLATION_REQUEST
})

export const mapDispatchToProps = (dispatch) => ({
  translateChange: (languageCode) => {
    dispatch(languageChange(languageCode));
  },
  translateLoad: () => {
    dispatch(load);
  }
});

export const mapStateToProps = (state) => ({
  translationState: state.translationReducer
})
