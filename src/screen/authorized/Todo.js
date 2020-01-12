`use strict`

import React from 'react';
import {
  View,
  Text
} from 'react-native';
import TodoList from "../../component/TodoList";

const Todo: () => React$Node = () => {
  return (
    <View>
      <TodoList/>
    </View>
  );
}

export default Todo;
