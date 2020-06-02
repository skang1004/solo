import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Spendings from "../components/Spendings.jsx";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeInput: "",
      incomeToday: 0,
    };
    this.handleText = this.handleText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleText(e) {
    this.setState({
      incomeInput: e.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    let num = parseInt(this.state.incomeInput);
    this.setState({
      incomeToday: num,
    });
    document.getElementById("income_id").value = "";
  }

  render() {
    return (
      <div>
        <label>How much will you earn today?</label>
        <input id="income_id" type="text" onChange={this.handleText}></input>
        <button type="submit" onClick={this.handleClick}>
          Submit
        </button>
        {this.state.incomeToday !== 0 ? (
          <div>
            <h2>Today's Earnings</h2>
            <h3>${this.state.incomeToday}</h3>
            <Link
              to={{
                pathname: "/spendings",
                state: {
                  income: this.state.incomeToday,
                },
              }}
            >
              <button type="button">Go to Spendings</button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MainContainer;
