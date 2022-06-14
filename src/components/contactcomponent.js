import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contact: "Tel.",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
        //
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.hadleBulr = this.hadleBulr.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbook" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value, //[] là array giúp ta có thể set được nhiều giá trị
    });
  }
  handleSubmit(event) {
    console.log("state is" + JSON.stringify(this.state));
    alert("state is" + JSON.stringify(this.state));
    event.preventDefault();
  }
  hadleBulr = (field) => (evt) => {
    this.setState({ touched: { ...this.state.touched, [field]: true } });
  };

  valiadate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = "shoule be >3 characters";
    else if (this.state.touched.firstname && firstname.length > 10)
      errors.firstname = "shoule be >10 characters";

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = "shoule be >3 characters";
    else if (this.state.touched.lastname && lastname.length > 10)
      errors.lastname = "shoule be >10 characters";
    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = "telnum should contain only numbers";
    if (
      this.state.touched.email &&
      email.split(" ").filter((x) => x === "@").length !== 1
    )
      errors.email = "email should contain a @";
    return errors;
  }

  render() {
    const errors = this.valiadate(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email
    );
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact us</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a role="button" className="btn btn-info">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>send us your feedback</h3>
            <div className="col-12 col-md-9">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label htmlfor="firstname" md={2}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      placeholder="First Name"
                      id="firstname"
                      name="firstname"
                      value={this.state.firstname}
                      valid={errors.firstname === ""}
                      invalid={errors.firstname !== ""}
                      onBlur={this.hadleBulr("firstname")}
                      onChange={this.handleInputChange}
                    ></Input>
                    <FormFeedback>{errors.firstname}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlfor="lastname" md={2}>
                    Last Name
                  </Label>
                  <Col md={10}>
                    <Input
                      type="text"
                      placeholder="last Name"
                      id="lastname"
                      name="lastname"
                      value={this.state.lastname}
                      valid={errors.lastname === ""}
                      invalid={errors.lastname !== ""}
                      onBlur={this.hadleBulr("lastname")}
                      onChange={this.handleInputChange}
                    ></Input>
                    <FormFeedback>{errors.lastname}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlfor="telnum" md={2}>
                    tel Num
                  </Label>
                  <Col md={10}>
                    <Input
                      type="tel"
                      placeholder="tel.Numner"
                      id="telnum"
                      name="telnum"
                      value={this.state.telnum}
                      valid={errors.telnum === ""}
                      invalid={errors.telnum !== ""}
                      onBlur={this.hadleBulr("telnum")}
                      onChange={this.handleInputChange}
                    ></Input>
                    <FormFeedback>{errors.telnum}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlfor="email" md={2}>
                    Email
                  </Label>
                  <Col md={10}>
                    <Input
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={this.state.email}
                      valid={errors.email === ""}
                      invalid={errors.email !== ""}
                      onBlur={this.hadleBulr("email")}
                      onChange={this.handleInputChange}
                    ></Input>
                    <FormFeedback>{errors.email}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={{ size: 6, offset: 2 }}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="agree"
                          checked={this.state.agree}
                          onChange={this.handleInputChange}
                        />{" "}
                        <b>May we contact you</b>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={{ size: 3, offset: 1 }}>
                    <Input
                      type="select"
                      name="contactType"
                      value={this.state.contactType}
                      onChange={this.handleInputChange}
                    >
                      <option>tel</option>
                      <option>email</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlfor="feedback" md={2}>
                    message
                  </Label>
                  <Col md={10}>
                    <Input
                      type="textarea"
                      rows="12"
                      id="message"
                      name="message"
                      value={this.state.message}
                      onChange={this.handleInputChange}
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="primary" color="primary">
                      {" "}
                      Send feedback
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
