import React, { Component } from "react";
import SpentItem from "./SpentItem.jsx";

class Spendings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: 0,
      budget: this.props.location.state.income,
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
        item_id.value = "";
        amount_id.value = "";
        // grab item and amount from response
        const { item, amount } = data;

        // create a copy of state.items and push response data
        const newItems = [...this.state.items];
        newItems.push({ item, amount });

        // recalculate the budget
        let newBudget = this.state.budget;
        let totalSpent = amount;
        newBudget = newBudget - totalSpent;
        this.setState({
          items: newItems,
          budget: newBudget,
        });
      })
      .catch((err) => console.log("Fetch to /spendings error: Error: ", err));
  }

  componentDidUpdate() {
    const { income } = this.props.location.state;
    console.log("income passed to spendings", income);
  }

  render() {
    let spentItems = [];
    this.state.items.forEach((el, i) => {
      spentItems.push(
        <SpentItem item={el.item} amount={el.amount} key={i} id={"item" + i} />
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
      </div>
    );
  }
}

export default Spendings;
