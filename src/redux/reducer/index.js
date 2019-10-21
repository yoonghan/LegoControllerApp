import {combineReducers, createStore, applyMiddleware} from "redux";
import loginReducer from "./LoginReducer";
import {legoControllerMiddleware} from "../middleware/legoControllerMiddleware";

const AppReducers = combineReducers({
  loginReducer
});

const rootReducers = (state, action) => {
  return AppReducers(state, action);
}

let store = createStore(rootReducers, {}, applyMiddleware(legoControllerMiddleware));

export default store;
