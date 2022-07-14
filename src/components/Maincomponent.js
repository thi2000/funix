import React, { Component } from "react";

import Menu from "./Menucomponents";
import Dishesdetal from "./Dishescomponent";
import { DISHES } from "../shared/dishes";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }
  onDishSelect(dishID) {
    this.setState({ selectedDish: dishID });
  }
  render() {
    return (
      <div>
        <div>
          <Menu
            dishes={this.state.dishes}
            onClick={(dishID) => this.onDishSelect(dishID)}
          />
          <Dishesdetal
            dish={
              this.state.dishes.filter(
                (dish) => dish.id === this.state.selectedDish
              )[0]
            }
          />
        </div>
      </div>
    );
  }
}

export default Main;
