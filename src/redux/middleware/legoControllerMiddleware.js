import * as ActionTypes from "../action/ActionTypes";
import * as LoginMiddleware from "./LoginMiddleware";
import * as TranslationMiddleware from "./TranslationMiddleware";

export const legoControllerMiddleware = store => next => action => {
  switch(action.action) {
    case ActionTypes.LOG_IN:
      LoginMiddleware.storeLogin(action.param)(next);
      break;
    case ActionTypes.LOG_IN_REQUEST:
      LoginMiddleware.checkLogin(next);
      break;
    case ActionTypes.LOG_OUT:
      LoginMiddleware.removeLogin(next);
      break;
    case ActionTypes.SIGN_OFF:
      LoginMiddleware.clearLoginTrace(next);
      break;
    case ActionTypes.TRANSLATION_REQUEST:
      TranslationMiddleware.checkStatus(next);
      break;
    case ActionTypes.TRANSLATION_STORE:
      TranslationMiddleware.storeLanguageCode(action.param)(store);
      break;
    case ActionTypes.TRANSLATION_CHANGE:
      TranslationMiddleware.changeLanguage(action.param)(next);
      break;
    default:
      next(action);
  }
}
