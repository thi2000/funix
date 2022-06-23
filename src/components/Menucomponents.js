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
      isModalOpen: false,
      search: "",
      input: "",
      id: this.props.staffs.length,
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: "",
      overTime: "",
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmitRedux = this.handleSubmitRedux.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  onSelect(search) {
    this.setState({ input: search });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleSubmitRedux(event) {
    const data = {
      id: this.state.id,
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department:
        this.state.department == undefined
          ? "DEPARTMENT[1]"
          : this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/alberto.png",
    };
    this.props.staffs.push(data);

    event.preventDefault();
  }
  validate(name, doB, startDate) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
    };
    if (this.state.touched.name && name.length == 0)
      errors.name = "yêu cầu nhập";
    else if (this.state.touched.name && name.length <= 2)
      errors.name = "yêu cầu nhập nhiều hơn 2 kí tự";
    else if (this.state.touched.name && name.length >= 30)
      errors.name = "yêu cầu nhập ít hơn 30 kí tự";

    if (this.state.touched.doB && doB.length == 0) errors.doB = "yêu cầu nhập";
    if (this.state.touched.startDate && startDate.length == 0)
      errors.startDate = "yêu cầu nhập";

    return errors;
  }
  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate
    );
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
                    // onClick={() => this.onSelect(this.state.search)}
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
              <Form onSubmit={this.handleSubmitRedux}>
                <FormGroup>
                  <Label htmlFor="name" md={4}>
                    Tên
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={this.state.name}
                      valid={errors.name === ""}
                      invalid={errors.name !== ""}
                      onBlur={this.handleBlur("name")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="doB" md={4}>
                    Ngày sinh
                  </Label>
                  <Col md={10}>
                    <Input
                      type="date"
                      id="doB"
                      name="doB"
                      value={this.state.doB}
                      valid={errors.doB === ""}
                      invalid={errors.doB !== ""}
                      onBlur={this.handleBlur("doB")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.doB}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="startDate" md={4}>
                    Ngàu vào công ty
                  </Label>
                  <Col md={10}>
                    <Input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={this.state.startDate}
                      valid={errors.startDate === ""}
                      invalid={errors.startDate !== ""}
                      onBlur={this.handleBlur("startDate")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.startDate}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="department" md={4}>
                    phòng ban
                  </Label>
                  <Col md={10}>
                    <Input
                      type="select"
                      id="department"
                      name="department"
                      value={this.state.department}
                      onBlur={this.handleBlur("department")}
                      onChange={this.handleInputChange}
                    >
                      <option value="DEPARTMENTS[0]">Sale</option>
                      <option value="DEPARTMENTS[1]">HR</option>
                      <option value="DEPARTMENTS[2]">Marketing</option>
                      <option value="DEPARTMENTS[3]">IT</option>
                      <option value="DEPARTMENTS[4]">Finance</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="salaryScale" md={4}>
                    Hệ số lương
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      id="salaryScale"
                      name="salaryScale"
                      value={this.state.salaryScale}
                      onBlur={this.handleBlur("salaryScale")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="annualLeave" md={4}>
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      id="annualLeave"
                      name="annualLeave"
                      value={this.state.annualLeave}
                      onBlur={this.handleBlur("annualLeave")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="overTime" md={4}>
                    Số ngày làm thêm
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      id="overTime"
                      name="overTime"
                      value={this.state.overTime}
                      onBlur={this.handleBlur("overTime")}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Menu;
