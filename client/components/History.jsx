import React, { Component } from "react";
import { Link } from "react-router-dom";
import PastBudgets from "./PastBudgets.jsx";
import PastDates from "./PastDates.jsx";

class History extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateBudgetHistory();
  }

  componentDidUpdate() {}

  render() {
    const dateArr = [];
    const budgetArr = [];
    this.props.budgetHistory.forEach((el) => {
      budgetArr.push(<PastBudgets budgets={el.budget} />);
      dateArr.push(<PastDates dates={el.date} />);
    });
    return (
      <div>
        <h3>Date || Remaining Budget</h3>
        <div id="date_budget">
          <ul id="dateArray">{dateArr}</ul>
          <ul id="budgetArray">{budgetArr}</ul>
        </div>
      </div>
    );
  }
}

export default History;
