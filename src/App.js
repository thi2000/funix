import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Main from "./components/Maincomponent";
import { ConfigureStore } from "./redux/configureStore";
import "./App.css";
const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* cung cap store cho cac components con  */}
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
