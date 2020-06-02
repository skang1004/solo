import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Main from "./containers/MainContainer.jsx";
import Axios from "axios";

import "./stylesheets/styles.css";

const App = (props) => {
  return (
    <div>
      <Main />
    </div>
  );
};

export default App;
