// @flow

import * as Actions from "../action/ActionTypes";

export type ActionType = {
  type: string,
  data: LoginInfoType
};

export type LoginInfoType = {
  username: string,
  token: string
}

export type LoginType = {
  query: boolean,
  loggedIn: boolean,
  info: LoginInfoType
}

const initial = {
  query: false,
  loggedIn: false,
  info: {},
  error: false
};

const LoginReducer = (state:LoginType = initial, action: ActionType) => {
  switch(action.type) {
    case Actions.LOGGED_IN_SUCCESS:
      return {
          ...state,
          query: false,
          loggedIn: true,
          info: action.data
      };
    case Actions.LOGGED_IN_FAILURE:
      return {
          ...state,
          error: true
      };
    case Actions.LOGGED_OUT_SUCCESS:
      return {
          ...state,
          query: false,
          loggedIn: false,
          info: {}
      };
    case Actions.LOG_INOUT_QUERY:
      return {
        ...state,
        query: true
      }
    case Actions.LOGGED_OUT_FAILURE:
    default:
      return state;
  }
}

export default LoginReducer;
