// @flow

import {connect, dispatch} from "react-redux";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';
import type { QRRegistrationType, QRRegisterType } from "../reducer/LoginReducer";
import type { ReducerStateType } from "../reducer";

export type QRRegistrationStateType = {
  qrState: QRRegistrationType
}

export type QRRegistrationActionType = {
  save: (string, string, string, string, string, string, string) => void,
  qrInfoLoad: () => void
}

const save = (param:QRRegisterType) => ({
  action: ActionTypes.QR_REGISTRATION_SAVE,
  param
});

export const load = ({
  action: ActionTypes.QR_REGISTRATION_LOAD
});

export const mapDispatchToProps = (dispatch: any):QRRegistrationActionType => ({
  save: (first_name: string, last_name: string, mobileno: string, email: string, address: string, postal_code: string, co_name) => {
    dispatch(save({first_name, last_name, mobileno, email, address, postal_code, co_name}))
  },
  qrInfoLoad: () => {
    dispatch(load)
  }
});

export const mapStateToProps = (state: ReducerStateType):QRRegistrationStateType => {
  return ({
    qrState: state.qrRegisterReducer
  });
}
