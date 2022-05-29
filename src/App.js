import React, { Component } from "react";
import Menu from "./components/Menucomponents";
import { Navbar, NavbarBrand } from "reactstrap";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/"> test NavBar</NavbarBrand>
            </div>
          </Navbar>
          <Menu />
        </div>
      </div>
    );
  }
}

export default App;
