import React from "react";
import { Card, CardBody, CardTitle, CardText, Media } from "reactstrap";
import { Link } from "react-router-dom";
function Phongban(props) {
  const phongban = props.departments.map((department) => {
    return (
      <div className="col-12 col-md-4 col-sm-6">
        <Card>
          <Link to={`/phongban/${department.id}`}>
            <CardTitle>{department.name}</CardTitle>
            <CardBody>
              <CardText>
                số lượng nhân viên :{department.numberOfStaff}
              </CardText>
            </CardBody>
          </Link>
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
