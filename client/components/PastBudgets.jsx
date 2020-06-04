import React from "react";

function PastBudgets(props) {
  return (
    <div>
      <div
        style={
          props.budgets >= 0
            ? { color: "rgb(63, 151, 63)" }
            : { color: "rgb(170, 0 ,0)" }
        }
      >
        ${props.budgets}
      </div>
    </div>
  );
}

export default PastBudgets;
