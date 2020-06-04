import React, { Component } from "react";

class SpentItem extends Component {
  constructor(props) {
    super(props);
  }

  delete(id) {
    this.props.delete(id);
  }

  render() {
    return (
      <div className="itemBox">
        <h3>Item: {this.props.item}</h3>
        <h3>Amount: ${this.props.amount}</h3>
        <span className="item_delete">
          <button
            onClick={this.props.delete}
            className="buttons"
            value={this.props.item}
            id={this.props.key1}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default SpentItem;
