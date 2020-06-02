import React, { Component } from "react";

class History extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("props in history", this.props.location.state);
    return (
      <div>
        <h1>inside history</h1>
      </div>
    );
  }
}

export default History;
