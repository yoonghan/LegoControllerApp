import React from 'react';
import {Provider} from "react-redux";
import store from "./src/redux/reducer";
import Main from "./src/screen/Main";

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
};

export default App;
