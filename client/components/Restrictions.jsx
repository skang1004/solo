import React, { Component } from "react";

const Restrictions = (props) => {
  return (
    <div>
      <ul>
        <li id={"li" + props.id}>{props.restrictions[props.id]}</li>
      </ul>
    </div>
  );
};

export default Restrictions;
