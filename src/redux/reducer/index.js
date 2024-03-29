// @flow

import {combineReducers, createStore, applyMiddleware} from "redux";
import loginReducer from "./LoginReducer";
import type {LoginType}  from "./LoginReducer";
import translationReducer from "./TranslationReducer";
import type {TranslationType}  from "./TranslationReducer";
import todoReducer from "./TodoReducer";
import type {TodoType}  from "./TodoReducer";
import {legoControllerMiddleware} from "../middleware/legoControllerMiddleware";

export type ReducerStateType = {
  loginReducer: LoginType,
  translationReducer: TranslationType,
  todoReducer: TodoType
}

const AppReducers = combineReducers({
  loginReducer,
  translationReducer,
  todoReducer
});

const rootReducers = (state, action) => {
  return AppReducers(state, action);
}

let store = createStore(rootReducers, {}, applyMiddleware(legoControllerMiddleware));

export default store;
