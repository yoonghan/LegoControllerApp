// @flow

import * as Actions from "../action/ActionTypes";

export type TodoModelType = {
  title: string,
  completed: boolean,
  createdAt: string
};

export type TodoType = {
  todoList: Array<TodoModelType>
}

const initial = {
  todoList: []
};

const TodoReducer = (state:TodoType = initial, action: ActionType) => {
  switch(action.type) {
    case Actions.TODO_STORE:
    case Actions.TODO_EXTRACT:
      return {
          ...state,
          todoList: action.data
      };
    case Actions.TODO_REMOVE:
      return {
          ...state,
          todoList: []
      };
    default:
      return state;
  }
}

export default TodoReducer;
