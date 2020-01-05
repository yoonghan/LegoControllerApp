import {combineReducers, createStore, applyMiddleware} from "redux";
import loginReducer from "./LoginReducer";
import translationReducer from "./TranslationReducer";
import {legoControllerMiddleware} from "../middleware/legoControllerMiddleware";

const AppReducers = combineReducers({
  loginReducer,
  translationReducer
});

const rootReducers = (state, action) => {
  return AppReducers(state, action);
}

let store = createStore(rootReducers, {}, applyMiddleware(legoControllerMiddleware));

export default store;
