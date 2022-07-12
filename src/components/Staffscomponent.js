import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
function RenderStaff({ staff }) {
  return (
    <div className="col-12 col-md-5 mt-1">
      <Card>
        <CardImg src={staff.image} alt={staff.name} />
        <CardBody>
          <CardTitle>{staff.name}</CardTitle>

          <CardText>{staff.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function Renderinfo({ staffs }) {
  if (staffs != null) {
    return (
      <Card>
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
const Staffsdetal = (props) => {
  if (props != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhanvien">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staffs.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staffs.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderStaff staff={props.staffs} />

          <Renderinfo staffs={props.staffs} />
        </div>
      </div>
    );
  }
};

export default Staffsdetal;
