import React, { Component } from "react";

class Spendings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: 0,
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
        this.props.history.push("/");
        console.log("this is data", data);
      })
      .catch((err) => console.log("Fetch to /spendings error: Error: ", err));
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Spendings;
