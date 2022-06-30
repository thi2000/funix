import React, { Component } from "react";
import Contact from "./contactcomponent";
import Home from "./Homecomponent";
import About from "./Aboutcomponent";
import Menu from "./Menucomponents";
import Dishesdetal from "./Dishescomponent";

import Header from "./headercomponent";
import Footer from "./footercomponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../redux/ActionCreators";
// duoc goi moi khi state store thay doi ,state se dc anh xa lai cho cac props
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
});
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishwithId = ({ match }) => {
      return (
        <Dishesdetal
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route
              path="/about"
              component={() => <About leaders={this.props.leaders} />}
            />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={this.props.dishes} />}
            />
            <Route path="/menu/:dishId" component={DishwithId} />
            <Route exact path="/contactus" component={Contact} />
            <Redirect to="home" />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); //ket noi voi store Redux
