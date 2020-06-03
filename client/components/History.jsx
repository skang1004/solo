import React, { Component } from "react";
import PastBudgets from "./PastBudgets.jsx";
import PastDates from "./PastDates.jsx";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetHistory: [],
    };
  }

  componentDidMount() {
    // before component mounts, post budget history into database
    fetch("/history", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        budget: this.props.location.state.remainingBudget,
        date: Date.now(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const hist = data.history.map((el) => {
          return { budget: el.budget, date: el.date };
        });
        this.setState({
          budgetHistory: hist,
        });
      })
      .catch((err) => console.log("Error in post request to /history ", err));
  }

  componentDidUpdate() {}

  render() {
    const budgetArr = [];
    const dateArr = [];
    // console.log("state history", this.props.location.state.history);
    this.state.budgetHistory.forEach((el) => {
      budgetArr.push(<PastBudgets budgets={el.budget} />);
      dateArr.push(<PastDates dates={el.date} />);
    });
    return (
      <div>
        <h3>Date</h3>
        <ul>{dateArr}</ul>
        <h3>Previous Remaining Budgets</h3>
        <ul>{budgetArr}</ul>
      </div>
    );
  }
}

export default History;
