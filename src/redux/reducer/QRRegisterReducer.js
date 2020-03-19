// @flow

import * as Actions from "../action/ActionTypes";

export type ActionType = {
  type: string,
  data: QRRegisterType
};

export type QRRegisterType = {
  first_name: string,
  last_name: string,
  mobileno: string,
  email: string,
  address: string,
  postal_code: string,
  co_name: string
}

export type QRRegistrationType = {
  query: boolean,
  registered: boolean,
  info: QRRegisterType,
  error: boolean
}

const initial = {
  query: false,
  registered: false,
  info: {},
  error: false
};

const QRRegisterReducer = (state:QRRegistrationType = initial, action: ActionType) => {
  switch(action.type) {
    case Actions.QR_REGISTER_SUCCESS:
      return {
        ...state,
        query: false,
        registered: true,
        info: action.data
      };
    case Actions.QR_REGISTER_FAILED:
      return {
        ...state,
        query: false,
        error: true
      };
    case Actions.QR_REGISTRATION_LOADING:
      return {
        ...state,
        query: true
      }
    default:
      return state;
  }
}

export default QRRegisterReducer;
