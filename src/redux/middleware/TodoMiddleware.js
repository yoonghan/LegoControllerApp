import * as ActionTypes from "../action/ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';

const TODO_KEY="@TodoKey";

export const extract = async (next) => {
  next({type: ActionTypes.TODO_EXTRACT_LOADING});

  let status = ActionTypes.TODO_EXTRACT_FAIL;
  let data = [];

  try {
    const dataList = await AsyncStorage.getItem(TODO_KEY);
    if(dataList !== null) {
      status = ActionTypes.TODO_EXTRACT_LOADED;
      data = dataList;
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

export const storeTodo = (data) => async (next) => {
}

export const deleteTodo = (idx) => async (next) => {
}
