import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Main from "./components/Maincomponent";

import "./App.css";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      // provider lay store lam thuoc tinh va store se co cho tat ca cac coponent dc ket not(connect)
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
