import React, { Component } from "react";
import Stafflist from "./components/Menucomponents";
import { Navbar, NavbarBrand } from "reactstrap";
import { STAFFS, DEPARTMENTS } from "./shared/staffs";
import dateFormat from "dateformat";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }
  render() {
    return (
      <div>
        <div>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">Ứng dụng quản lí nhân sự v1.0</NavbarBrand>
            </div>
          </Navbar>
          <Stafflist staffs={this.state.staffs} />
        </div>
      </div>
    );
  }
}
export default App;
