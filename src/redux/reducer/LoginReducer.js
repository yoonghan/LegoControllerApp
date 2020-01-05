import * as Actions from "../action/ActionTypes";

const initial = {
  query: false,
  loggedIn: false,
  info: {}
};

const LoginReducer = (state = initial, action) => {
  switch(action.type) {
    case Actions.LOGGED_IN_SUCCESS:
      return {
          ...state,
          query: false,
          loggedIn: true,
          info: action.data
      };
    case Actions.LOGGED_IN_FAILURE:
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
