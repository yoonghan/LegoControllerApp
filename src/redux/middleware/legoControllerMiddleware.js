import * as ActionTypes from "../action/ActionTypes";
import * as LoginMiddleware from "./LoginMiddleware";

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
    default:
      next(action);
  }
}
