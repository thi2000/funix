import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardGroup,
} from "reactstrap";
import dateFormat from "dateformat";

class Stafflist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      selectder: null,
    };
  }
  onSelect(staffs) {
    this.setState({ selected: staffs });
  }
  renderdetail(staffs, department) {
    if (this.state.selected != null) {
      return (
        <Card style={{ marginTop: "40px", marginLeft: "15px" }}>
          <CardTitle>Họ và tên{staffs.name}</CardTitle>
          <CardText>Ngày sinh:{dateFormat(staffs.doB, "dd/mm/yyyy")}</CardText>
          <CardText>
            Ngày vào công ty:{dateFormat(staffs.doB, "dd/mm/yyyy")}
          </CardText>
          <CardText>phòng ban:{staffs.department.name}</CardText>
          <CardText>Số ngày nghỉ còn lại:{staffs.annualLeave}</CardText>
          <CardText>Số ngày làm đã thêm:{staffs.overTime}</CardText>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    const menu = this.props.staffs.map((staffs) => {
      return (
        <div className="col-12 col-md-5 mt-1">
          <Card
            key={staffs.id}
            style={{ height: "35px" }}
            onClick={() => this.onSelect(staffs)}
          >
            <CardText>{staffs.name}</CardText>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderdetail(this.state.selected)}</div>

        <p>Bấm vào để xem thông tin.</p>
      </div>
    );
  }
}
export default Stafflist;
