import React, { Component } from "react";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import SpentItem from "./SpentItem.jsx";
import History from "./History.jsx";

class Spendings extends Component {
  constructor(props) {
    super(props);
    this.saveBudget = this.saveBudget.bind(this);
  }

  componentDidUpdate() {}

  postSpendings(e) {
    this.props.postSpendings(e);
  }

  saveBudget(e) {
    e.preventDefault();
    const body = {
      date: Date.now(),
      budget: this.props.remainingBudget,
    };
    fetch("/history", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    }).then(() => {
      alert(
        `Saved your remaining budget! Check your previous budgets to find more`
      );
    });
  }

  render() {
    let spentItems = [];
    this.props.itemList.forEach((el, i) => {
      spentItems.push(
        <SpentItem
          delete={this.props.delete}
          item={el.item}
          amount={el.amount}
          key={"spentItemComp" + i}
          key1={i}
          id={"item" + i}
        />
      );
    });
    return (
      <div>
        <div>
          <h2>Today's budget: ${this.props.incomeToday}</h2>
        </div>
        <form type="submit">
          <label className="label">What did you buy? </label>
          <input
            type="text"
            id="item_id"
            onChange={this.props.handleChange}
            placeholder="Item"
          ></input>
          <label className="label">How much was it? </label>
          <input
            type="number"
            id="amount_id"
            onChange={this.props.handleChange}
            placeholder="Amount"
          ></input>
          <button
            className="buttons"
            type="submit"
            onClick={this.props.postSpendings}
          >
            Save your items!
          </button>
        </form>
        {spentItems}
        <div>
          <h1>Remaining Budget: ${this.props.remainingBudget}</h1>
        </div>

        <button onClick={this.saveBudget} className="buttons" type="button">
          Record your spendings
        </button>
      </div>
    );
  }
}

export default Spendings;
