import {connect, dispatch} from "react-redux";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';

export const login = (param) => {
  return {
    action: ActionTypes.LOG_IN,
    param
  }
}

export const logout = ({
  action: ActionTypes.LOG_OUT
})

export const status = ({
  action: ActionTypes.LOG_IN_REQUEST
})

export const mapDispatchToProps = (dispatch) => ({
  login: (username, token) => {
    dispatch(login({username, token}))
  },
  logout: () => {dispatch(logout)},
  status: () => {dispatch(status)}
});

export const mapStateToProps = (state) => ({
  loginState: state.loginReducer
})
