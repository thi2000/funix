import React, { Component } from "react";
import Bangluong from "./Bangluongcomponent";

import Menu from "./Menucomponents";
import Staffsdetal from "./Staffscomponent";

import Header from "./headercomponent";
import Footer from "./footercomponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Phongban from "./Phongbancomponent";
import { connect } from "react-redux";
import { fetchStaffs, fetchDepartments, addNV } from "../redux/Actioncreater";
import Nhanvienphongban from "./nhanvienphongban";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addNV: (
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime
  ) => {
    dispatch(
      addNV(
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime
      )
    );
  },

  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  //chay cac api trước cap nhat

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }

  render() {
    const StaffwithId = ({ match }) => {
      return (
        <Staffsdetal
          staffs={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffID, 10)
            )[0]
          }
        />
      );
    };

    const DepartmentsId = ({ match }) => {
      return (
        <Nhanvienphongban
          staffs={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.departmentId
          )}
        />
      );
    };

    return (
      <div>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/phongban"
              component={() => (
                <Phongban departments={this.props.departments.departments} />
              )}
            />
            <Route
              exact
              path="/nhanvien"
              component={() => (
                <Menu
                  staffs={this.props.staffs.staffs}
                  isLoading={this.props.staffs.isLoading}
                  errMess={this.props.staffs.errMess}
                  addNV={this.props.addNV}
                  xoaNV={this.props.xoaNV}
                />
              )}
            />
            <Route path="/nhanvien/:staffID" component={StaffwithId} />
            <Route path="/phongban/:departmentId" component={DepartmentsId} />
            <Route
              path="/bangluong"
              component={() => <Bangluong staffs={this.props.staffs.staffs} />}
            />

            <Redirect to="nhanvien" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
