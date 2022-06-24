import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  Modal,
  ModalBody,
  Input,
  Col,
  Button,
  Row,
  Form,
  FormGroup,
  Label,
  ModalHeader,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { objectOf } from "prop-types";
const required = (val) => val && val.length;

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

function RenderMenuItem({ staff }) {
  return (
    <Card>
      <Link to={`/nhanvien/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />

        <CardText>{staff.name}</CardText>
      </Link>
    </Card>
  );
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      input: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  onSelect(search) {
    console.log(typeof this.props.staffs[0].department);
    this.setState({ input: search });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleSubmitRedux(value) {
    this.toggleModal();
    const data = {
      id: this.props.staffs.length,
      name: value.name,
      doB: value.doB,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      department:
        value.department == undefined ? "DEPARTMENTS[0]" : value.department,

      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/alberto.png",
    };
    console.log(data);
    this.props.staffs.push(data);
  }

  render() {
    const menu = this.props.staffs
      .filter((staff) => {
        return staff.name.toLowerCase().includes(this.state.input);
      })
      .map((staff) => {
        return (
          <div className="col-6 col-md-2 col-sm-4 mt-1" key={staff.id}>
            <RenderMenuItem staff={staff} />
          </div>
        );
      });

    return (
      <div className="container">
        <div className="col-12">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Row>
                <Col md={3} xs={10}>
                  <h3>Nhân Viên</h3>
                </Col>
                <Col md={1} xs={1}>
                  <Button
                    className="fa fa-plus fa-lg"
                    onClick={this.toggleModal}
                  ></Button>
                </Col>
                <Col md={{ size: 3, offset: 4 }} xs={10}>
                  <Input
                    type="search"
                    name="search"
                    className="search-input"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={1} xs={1}>
                  <Button
                    color="primary"
                    onClick={() => this.onSelect(this.state.search)}
                  >
                    Tìm
                  </Button>
                </Col>
              </Row>
              <div className="row">{menu}</div>
            </FormGroup>
          </Form>
          <hr />
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
              <h3>Thêm Nhân Viên</h3>
            </ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmitRedux(values)}>
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
                    Ngày Sinh
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".doB"
                      id="doB"
                      name="doB"
                      type="date"
                      className="form-control"
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
                  <Label htmlFor="department" md={4}>
                    Phòng ban
                  </Label>
                  <Col md={8}>
                    <Control.select
                      model=".department"
                      id="department"
                      name="department"
                      className="form-control"
                    >
                      <option value="DEPARTMENTS[0]">Sale</option>
                      <option value="DEPARTMENTS[1]">HR</option>
                      <option value="DEPARTMENTS[2]">Marketing</option>
                      <option value="DEPARTMENTS[3]">IT</option>
                      <option value="DEPARTMENTS[4]">Finance</option>
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
                      defaultValue="1"
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
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Menu;
