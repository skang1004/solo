import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Spendings from "../components/Spendings.jsx";

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleClick();
  }

  handleText() {
    this.props.handleText();
  }

  render() {
    console.log("this is props", this.props);
    return (
      <div className="mainContainerBox">
        <div className="todayBlock">
          <label className="label">How much will you earn today? </label>
          <input
            id="income_id"
            type="text"
            onChange={this.props.handleText}
          ></input>
          <button
            className="buttons"
            type="submit"
            onClick={this.props.handleClick}
          >
            Submit
          </button>
        </div>
        {this.props.incomeToday !== 0 ? (
          <div className="todayIncome">
            <h2 id="todayEarning">Today's Earnings</h2>
            <h3 id="income">${this.props.incomeToday}</h3>
            <Link
              to={{
                pathname: "/spendings",
                state: {
                  income: this.props.incomeToday,
                },
              }}
            >
              <button className="buttons" type="button">
                Go to Spendings
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MainContainer;
