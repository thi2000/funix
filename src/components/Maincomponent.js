import React, { Component } from "react";
import Bangluong from "./Bangluongcomponent";

import Menu from "./Menucomponents";
import Staffsdetal from "./Staffscomponent";

import Header from "./headercomponent";
import Footer from "./footercomponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Phongban from "./Phongbancomponent";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const StaffwithId = ({ match }) => {
      return (
        <Staffsdetal
          staffs={
            this.props.staffs.filter(
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
                <Phongban departments={this.props.departments} />
              )}
            />
            <Route
              exact
              path="/nhanvien"
              component={() => <Menu staffs={this.props.staffs} />}
            />
            <Route path="/nhanvien/:staffID" component={StaffwithId} />
            <Route
              path="/bangluong"
              component={() => <Bangluong staffs={this.props.staffs} />}
            />

            <Redirect to="nhanvien" />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
