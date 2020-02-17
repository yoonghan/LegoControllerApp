import * as ActionTypes from "../action/ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const LOGIN_KEY="@LoginKey";
const LOGIN_USERNAME = "@LoginUsername";
const LOGIN_TOKEN = "@LoginToken";

export const storeLogin = (param) => async (next) => {
  try {
    const {username, token} = param;
    if(username && token) {
      await AsyncStorage.setItem(LOGIN_KEY, username);
      await AsyncStorage.setItem(LOGIN_USERNAME, username);
      await AsyncStorage.setItem(LOGIN_TOKEN, token);
      next({
        type: ActionTypes.LOGGED_IN_SUCCESS,
        data: _getInformation(username, token)
      });
    }
    else {
      console.warn(`Unexpected error, no ${LOGIN_USERNAME}, ${LOGIN_TOKEN}`);
    }
  } catch (e) {
    next({
      type: ActionTypes.LOGGED_IN_FAILURE
    });
  }
}

export const checkLogin = async (next) => {
  next({type: ActionTypes.LOG_INOUT_QUERY});

  let status = ActionTypes.LOGGED_IN_FAILURE;
  let data = {};

  try {
    const loginKey = await AsyncStorage.getItem(LOGIN_KEY);
    const username = await AsyncStorage.getItem(LOGIN_USERNAME);
    const token = await AsyncStorage.getItem(LOGIN_TOKEN);
    if(username !== null && token !== null) {
      status = ActionTypes.LOGGED_IN_SUCCESS;
      data = _getInformation(username, token);
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

export const clearLoginTrace = async (next) => {
  try {
    await removeLogin(next, true);
    await auth().signOut();
    next({
      type: ActionTypes.SIGN_OFF_SUCCESS
    });
  }
  catch(e) {
    next({
      type: ActionTypes.SIGN_OFF_FAILURE
    });
  }
}

export const removeLogin = async (next, shouldNotReturnAction) => {
  try {
    await AsyncStorage.removeItem(LOGIN_KEY);
    await AsyncStorage.removeItem(LOGIN_USERNAME);
    await AsyncStorage.removeItem(LOGIN_TOKEN);
    if(!shouldNotReturnAction) {
      next({
        type: ActionTypes.LOGGED_OUT_SUCCESS
      });
    }
  }
  catch(e) {
    if(!shouldNotReturnAction) {
      next({
        type: ActionTypes.LOGGED_OUT_FAILURE
      });
    }
    else {
      throw Exception("Unable to logout");
    }
  }
}

const _getInformation = (username, token) => ({
  username,
  token
})
