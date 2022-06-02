import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

class Dishesdetal extends Component {
  renderdishes(dish) {
    return (
      <div className="col-12 col-md-5 mt-1">
        <Card>
          <CardImg src={this.props.dish.image} alt={this.props.dish.name} />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  rendercomments(comments) {
    if (comments != null) {
      const commentlist = comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>

            <p>
              {comment.author},
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </li>
        );
      });
      return (
        <div className="col-12 col-md-5 mt-1">
          <h4>comment</h4>
          <ul className="list-unstyled">{commentlist}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            {this.renderdishes(this.props.dish)}
            {this.rendercomments(this.props.dish.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default Dishesdetal;
