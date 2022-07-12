import React, { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Control, LocalForm, Errors } from "react-redux-form";
const required = (val) => val && val.length;

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const replaceNV = (
  id,
  name,
  doB,
  salaryScale,
  startDate,
  departmentId,
  annualLeave,
  overTime
) => {
  axios({
    method: "patch",
    url: baseUrl + "staffs",
    data: {
      id: id,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
    },
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
};

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
        <CardTitle>Họ và tên :{staffs.name}</CardTitle>
        <CardBody>
          <CardText>Ngày sinh:{dateFormat(staffs.doB, "dd/mm/yyyy")}</CardText>
          <CardText>
            Ngày vào công ty:{dateFormat(staffs.doB, "dd/mm/yyyy")}
          </CardText>
          <CardText>phòng ban:{staffs.departmentId}</CardText>
          <CardText>Số ngày nghỉ còn lại:{staffs.annualLeave}</CardText>
          <CardText>Số ngày làm đã thêm:{staffs.overTime}</CardText>
        </CardBody>
        <Replace staffs={staffs} />
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
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active></BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3></h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderStaff
            staff={props.staffs}
            isLoading={props.isloading}
            errMess={props.errMess}
          />

          <Renderinfo staffs={props.staffs} />
        </div>
      </div>
    );
  }
};

class Replace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleSubmit(value) {
    this.toggleModal();
    replaceNV(
      this.props.staffs.id,
      value.name,
      value.doB,
      value.salaryScale,
      value.startDate,
      value.departmentId,
      value.annualLeave,
      value.overTime
    );
  }
  render() {
    const Datedob = new Date(this.props.staffs.doB);
    const date = dateFormat(Datedob, "yyyy-mm-dd");
    const Datestart = new Date(this.props.staffs.startDate);
    const date2 = dateFormat(Datestart, "yyyy-mm-dd");
    return (
      <div>
        <button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" /> Replace
        </button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Repalce</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    defaultValue={`${this.props.staffs.name}`}
                    validators={{
                      required,

                      maxLength: maxLength(30),
                      minLength: minLength(3),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "yêu cầu nhập",
                      minLength: " nhiều hơn 2 kí tư",

                      maxLength: " ít hơn 30 kí tư",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>
                  {date}
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".doB"
                    id="doB"
                    name="doB"
                    type="date"
                    className="form-control"
                    defaultValue={date}
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".startDate"
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="form-control"
                    validators={{
                      required,
                    }}
                    defaultValue={date2}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="departmentId" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".departmentId"
                    id="departmentsId"
                    name="departmentId"
                    className="form-control"
                    defaultValue={`${this.props.staffs.departmentId}`}
                  >
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>

                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    placeholder="1.0->3.0"
                    defaultValue={`${this.props.staffs.salaryScale}`}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    defaultValue={`${this.props.staffs.annualLeave}`}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    defaultValue={`${this.props.staffs.overTime}`}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Sửa
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Staffsdetal;
