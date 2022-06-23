import React from "react";
import { Card, CardBody, CardTitle, CardText, Media } from "reactstrap";
import { Link } from "react-router-dom";
function Phongban(props) {
  const phongban = props.departments.map((department) => {
    return (
      <div className="col-12 col-md-4 col-sm-6">
        <Card>
          <CardTitle>{department.name}</CardTitle>
          <CardBody>
            <CardText>số lượng nhân viên :{department.numberOfStaff}</CardText>
            <CardText></CardText>
          </CardBody>
        </Card>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row ">{phongban}</div>
    </div>
  );
}
export default Phongban;
