import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

class Bangluong extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const render = this.props.staffs.map((staffs) => {
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
                  lương:
                  {parseInt(
                    staffs.salaryScale * 3000000 + staffs.overTime * 200000
                  )}
                </CardText>
              </Card>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div>
          <Form>
            <FormGroup>
              <Label for="sort">SORT</Label>
              <Input id="sort" name="select" type="select">
                <option>tang</option>
                <option>giam</option>
              </Input>
            </FormGroup>
          </Form>
        </div>

        <div className="row ">{render}</div>
      </div>
    );
  }
}
export default Bangluong;
