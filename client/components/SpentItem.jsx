import React from "react";

export default function SpentItem(props) {
  return (
    <div>
      <h3>Item: {props.item}</h3>
      <h3>Amount: ${props.amount}</h3>
    </div>
  );
}
