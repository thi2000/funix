import React, { Component } from "react";
import Contact from "./contactcomponent";
import Home from "./Homecomponent";
import Menu from "./Menucomponents";
import Dishesdetal from "./Dishescomponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comment";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import Header from "./headercomponent";
import Footer from "./footercomponent";
import { Switch, Route, Redirect } from "react-router-dom";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishwithId = ({ match }) => {
      return (
        <Dishesdetal
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
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
              exact
              path="/menu"
              component={() => <Menu dishes={this.state.dishes} />}
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

export default Main;
