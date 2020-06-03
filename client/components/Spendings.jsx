import React, { Component } from "react";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import SpentItem from "./SpentItem.jsx";
import History from "./History.jsx";

class Spendings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: 0,
      budget: this.props.location.state.income,
      remainingBudget: this.props.location.state.income,
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    if (e.target.id === "item_id") {
      this.setState({
        item: e.target.value,
      });
    } else if (e.target.id === "amount_id") {
      this.setState({
        amount: e.target.value,
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const body = {
      item: this.state.item,
      amount: this.state.amount,
    };
    fetch("/spendings", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        const item_id = document.getElementById("item_id");
        const amount_id = document.getElementById("amount_id");
        const id =
          // resetting the input values to empty string for next item
          (item_id.value = "");
        amount_id.value = "";
        // grab item and amount from response
        const { item, amount } = data;

        // create a copy of state.items and push response data
        const newItems = [...this.state.items];
        newItems.push({ item, amount });

        // recalculating the budget
        let newBudget = this.state.remainingBudget;
        newBudget = newBudget - amount;
        this.setState({
          items: newItems,
          remainingBudget: newBudget,
        });
      })
      .catch((err) => console.log("Fetch to /spendings error: Error: ", err));
  }

  delete(id) {
    id.preventDefault();
    console.log("id ", id.target.className.slice(4));
    id = id.target.className.slice(4);
    // const newItems = this.state.items.filter((el, i) => i != id)
    this.setState((prevState) => ({
      items: prevState.items.filter((el, i) => i != id),
    }));
  }

  componentDidUpdate() {}

  render() {
    let spentItems = [];
    this.state.items.forEach((el, i) => {
      spentItems.push(
        <SpentItem
          delete={this.delete}
          item={el.item}
          amount={el.amount}
          key={i}
          id={"item" + i}
        />
      );
    });
    return (
      <div>
        <div>
          <h2>Today's budget: {this.state.budget}</h2>
        </div>
        <form type="submit">
          <label>What did you buy? </label>
          <input
            type="text"
            id="item_id"
            onChange={this.handleChange}
            placeholder="Item"
          ></input>
          <label>How much was it? </label>
          <input
            type="number"
            id="amount_id"
            onChange={this.handleChange}
            placeholder="Amount"
          ></input>
          <button type="submit" onClick={this.handleClick}>
            Save your items!
          </button>
        </form>
        {spentItems}
        <div>
          <h1>Remaining Budget: ${this.state.remainingBudget}</h1>
        </div>

        <Link
          to={{
            pathname: `/history`,
            state: {
              remainingBudget: this.state.remainingBudget,
              budget: this.state.budget,
              history: [],
            },
          }}
        >
          <button type="button">Record your spendings</button>
        </Link>
      </div>
    );
  }
}

export default Spendings;
