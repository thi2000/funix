import React, { Component } from "react";
import Bangluong from "./Bangluongcomponent";

import Menu from "./Menucomponents";
import Staffsdetal from "./Staffscomponent";

import { DEPARTMENTS, STAFFS } from "../shared/staffs";
import Header from "./headercomponent";
import Footer from "./footercomponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Phongban from "./Phongbancomponent";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const StaffwithId = ({ match }) => {
      return (
        <Staffsdetal
          staffs={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffID, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <div>
          <Header />
          <Switch>
            <Route
              path="/phongban"
              component={() => (
                <Phongban departments={this.state.departments} />
              )}
            />
            <Route
              exact
              path="/nhanvien"
              component={() => <Menu staffs={this.state.staffs} />}
            />
            <Route path="/nhanvien/:staffID" component={StaffwithId} />
            <Route
              path="/bangluong"
              component={() => <Bangluong staffs={this.state.staffs} />}
            />

            <Redirect to="nhanvien" />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
