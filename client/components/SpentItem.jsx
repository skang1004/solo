import React, { Component } from "react";

class SpentItem extends Component {
  constructor(props) {
    super(props);
    // this.deleteItem = this.deleteItem.bind(this);
  }

  //   deleteItem(e) {
  //     e.preventDefault();
  //     const item = e.target.value;
  //     const amount = e.target.id;
  //     console.log(item, amount);
  //     fetch("/spendings", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "Application/JSON",
  //       },
  //       body: JSON.stringify({ item, amount }),
  //     }).catch((err) => console.log("Error in delete to /spendings, ", err));
  //   }
  delete(id) {
    // id.target.className.slice(4);
    this.props.delete(id);
  }

  render() {
    return (
      <div>
        <h3>Item: {this.props.item}</h3>
        <h3>Amount: ${this.props.amount}</h3>
        <span>
          <button
            onClick={this.props.delete}
            className={this.props.id}
            value={this.props.item}
            id={this.props.amount}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default SpentItem;
