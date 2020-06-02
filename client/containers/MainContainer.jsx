import React, { Component } from "react";
import Restrictions from "../components/Restrictions.jsx";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restrictions: [],
      newRestriction: "",
    };
    this.handleText = this.handleText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findRecipes = this.findRecipes.bind(this);
  }

  handleText(e) {
    this.setState({
      newRestriction: e.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    let arr = this.state.restrictions;
    arr.push(this.state.newRestriction);
    let input = document.getElementById("restriction_id");
    input.value = "";
    this.setState({
      restrictions: arr,
      newRestriction: "",
    });
  }

  findRecipes() {
    console.log("clicked");
  }

  render() {
    let restrictions = [];
    this.state.restrictions.forEach((el, i) => {
      restrictions.push(
        <Restrictions id={i} restrictions={this.state.restrictions} />
      );
    });
    return (
      <div>
        <label>What are your dietary restrictions or health issues?</label>
        <input
          id="restriction_id"
          type="text"
          onChange={this.handleText}
        ></input>
        <button type="submit" onClick={this.handleClick}>
          Submit
        </button>
        {restrictions}
        {restrictions.length > 0 ? (
          <button id="find_recipes" type="submit" onClick={this.findRecipes}>
            Find Recipes
          </button>
        ) : null}
      </div>
    );
  }
}

export default MainContainer;
