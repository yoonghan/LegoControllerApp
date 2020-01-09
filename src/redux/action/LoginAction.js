// @flow

import {connect, dispatch} from "react-redux";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';
import type { LoginType, LoginInfoType } from "../reducer/LoginReducer";
import type { ReducerStateType } from "../reducer";

export type LoginStateType = {
  loginState: LoginType
}

export type LoginActionType = {
  login: (string, string) => void,
  logout: () => void,
  loginLoad: () => void
}

export const login = (param: LoginInfoType) => {
  return {
    action: ActionTypes.LOG_IN,
    param
  }
}

export const logout = ({
  action: ActionTypes.LOG_OUT
})
;
export const load = ({
  action: ActionTypes.LOG_IN_REQUEST
})

export const mapDispatchToProps = (dispatch: any):LoginActionType => ({
  login: (username: string, token: string) => {
    dispatch(login({username, token}))
  },
  logout: () => {
    dispatch(logout)
  },
  loginLoad: () => {
    dispatch(load)
  }
});

export const mapStateToProps = (state: ReducerStateType):LoginStateType => ({
  loginState: state.loginReducer
})
