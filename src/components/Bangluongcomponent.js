import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

function Bangluong(props) {
  const render = props.staffs.map((staffs) => {
    return (
      <div className="col-12 col-md-4 col-sm-6">
        <Card>
          <CardTitle tag="h3">{staffs.name}</CardTitle>
          <CardBody>
            <CardText>Mã nhân viên: {staffs.id}</CardText>
            <CardText>Hệ số lương:{staffs.salaryScale}</CardText>
            <CardText>Số ngày làm thêm: {staffs.overTime}</CardText>
            <Card color="info">
              <CardText>
                lương:{staffs.salaryScale * 3000000 + staffs.overTime * 200000}
              </CardText>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row ">{render}</div>
    </div>
  );
}
export default Bangluong;
