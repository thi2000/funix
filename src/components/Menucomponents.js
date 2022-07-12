import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardGroup,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Form,
  Input,
  Col,
  Button,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  onSelect(search) {
    this.setState({ input: search });
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
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhanvien">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12"></div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Row>
                <Col md={7}>
                  <h3>Menu</h3>
                </Col>
                <Col md={3}>
                  <Input
                    type="search"
                    name="search"
                    className="search-input"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    primary
                    onClick={() => this.onSelect(this.state.search)}
                  >
                    search
                  </Button>
                </Col>
              </Row>
              <div className="row">{menu}</div>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default Menu;
