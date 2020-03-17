// @flow

import {connect, dispatch} from "react-redux";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';
import type { TodoType } from "../reducer/TodoReducer";
import type { ReducerStateType } from "../reducer";

export type TodoStateType = {
  todoState: TodoType
}

export type TodoActionType = {
  add: (string) => void,
  remove: (number) => void,
  query: () => void
}

const add = (data: string) => {
  return {
    action: ActionTypes.TODO_STORE,
    data: data
  }
}

const remove = (idx: number) => {
  return {
    action: ActionTypes.TODO_REMOVE,
    idx: idx
  }
}

const query = {
  return {
    action: ActionTypes.TODO_EXTRACT
  }
}

export const mapDispatchToProps = (dispatch: any):TodoActionType => ({
  add: (data: string) => {
    dispatch(add(data))
  },
  remove: (idx: number) => {
    dispatch(remove(data))
  },
  query: () => {
    dispatch(query)
  }
});

export const mapStateToProps = (state: ReducerStateType):TodoStateType => ({
  todoState: state.todoReducer
})
