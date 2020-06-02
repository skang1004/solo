import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./components/Login.jsx";
import Spendings from "./components/Spendings.jsx";
import History from "./components/History.jsx";
import Main from "./containers/MainContainer.jsx";
import Axios from "axios";

import "./stylesheets/styles.css";

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/spendings" component={Spendings} />
        <Route exact path="/history" component={History} />
      </Switch>
    </div>
  );
};

export default App;
