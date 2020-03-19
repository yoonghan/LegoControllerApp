import * as ActionTypes from "../action/ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';

const QRINFOS="@QRINFOS";

export const saveQRInfo = (param) => async (next) => {
  try {
    if(param) {
      const valueInJSON = JSON.stringify(param);
      await AsyncStorage.setItem(QRINFOS, valueInJSON);
      next({
        type: ActionTypes.QR_REGISTER_SUCCESS,
        data: valueInJSON
      });
    }
    else {
      console.warn(`Unexpected error, no param`);
    }
  } catch (e) {
    next({
      type: ActionTypes.QR_REGISTER_FAILED
    });
  }
}

export const checkQrRegistration = async (next) => {
  next({type: ActionTypes.QR_REGISTRATION_LOADING});

  let status = ActionTypes.QR_REGISTER_FAILED;
  let data = {};

  try {
    const qrInfo = await AsyncStorage.getItem(QRINFOS);
    if(qrInfo !== null) {
      status = ActionTypes.QR_REGISTER_SUCCESS;
      data = qrInfo;
    }
  }
  catch(e) {
    //Do nothing, failing.
  }

  next({
    type: status,
    data: data
  });
}
