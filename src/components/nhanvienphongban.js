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

function Rendernhanvien({ staff }) {
  return (
    <Card>
      <CardImg width="100%" src={staff.image} alt={staff.name} />

      <CardText>{staff.name}</CardText>
    </Card>
  );
}
const Nhanvienphongban = (props) => {
  const Nhanvien = props.staffs.map((staff) => {
    return (
      <div className="col-6 col-md-2 col-sm-4 mt-1">
        <Rendernhanvien staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{Nhanvien}</div>
    </div>
  );
};
export default Nhanvienphongban;
