import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Spendings from "./components/Spendings.jsx";
import History from "./components/History.jsx";
import Main from "./containers/MainContainer.jsx";
import Axios from "axios";

import "./stylesheets/styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      incomeInput: "",
      incomeToday: 0,
      item: "",
      itemAmount: 0,
      budget: 0,
      remainingBudget: 0,
      itemList: [],
      budgetHistory: [],
      dateArr: [],
      budgetArr: [],
    };
    this.handleText = this.handleText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postSpendings = this.postSpendings.bind(this);
    this.delete = this.delete.bind(this);
    this.updateBudgetHistory = this.updateBudgetHistory.bind(this);
  }

  handleText(e) {
    this.setState({
      incomeInput: e.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    let num = parseInt(this.state.incomeInput);
    this.setState({
      incomeToday: num,
      remainingBudget: num,
    });
    document.getElementById("income_id").value = "";
  }

  handleChange(e) {
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

  postSpendings(e) {
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
        // resetting the input values to empty string for next item
        item_id.value = "";
        amount_id.value = "";
        // grab item and amount from response
        const { item, amount } = data;

        // create a copy of state.items and push response data
        const newItems = [...this.state.itemList];
        newItems.push({ item, amount });

        // recalculating the budget
        const sum = newItems.reduce((acc, cur) => {
          return (acc += cur.amount);
        }, 0);
        // console.log("sum ", sum);
        let newBudget = this.state.incomeToday - sum;
        // newBudget = newBudget - amount;
        this.setState({
          itemList: newItems,
          remainingBudget: newBudget,
        });
      })
      .catch((err) => console.log("Fetch to /spendings error: Error: ", err));
  }

  delete(id) {
    id.preventDefault();
    id = id.target.id;
    // const newItems = this.state.items.filter((el, i) => i != id)
    const newItems = this.state.itemList.filter((el, i) => i != id);
    const sum = newItems.reduce((acc, cur) => {
      return (acc += cur.amount);
    }, 0);
    const newBudget = this.state.incomeToday - sum;
    this.setState({
      itemList: newItems,
      remainingBudget: newBudget,
    });
  }

  componentDidMount() {
    fetch("/history")
      .then((res) => res.json())
      .then((data) => {
        const newBudget = data.history.map((el) => {
          const date = el.date.slice(0, 10);
          return { date, budget: el.budget };
        });
        this.setState({
          budgetHistory: newBudget,
        });
      })
      .catch((err) => console.log(err));
  }

  updateBudgetHistory(e) {
    fetch("/history")
      .then((res) => res.json())
      .then((data) => {
        const newBudget = data.history.map((el) => {
          const date = el.date.slice(0, 10);
          return { date, budget: el.budget };
        });
        this.setState({
          budgetHistory: newBudget,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="appDiv">
        <h2 id="welcome_statement">Hey {this.props.username}</h2>
        <Router>
          <ul id="header">
            <li>
              <Link to="/" className="links">
                Home
              </Link>
            </li>
            {this.state.incomeToday !== 0 ? (
              <li>
                <Link to="/spendings" className="links">
                  Spendings
                </Link>
              </li>
            ) : null}
            {this.state.incomeToday !== 0 ? (
              <li>
                <Link to="/history" className="links">
                  Previous Budgets
                </Link>
              </li>
            ) : null}
          </ul>
          <Route
            exact
            path="/"
            render={(props) => (
              <Main
                {...props}
                handleText={this.handleText}
                handleClick={this.handleClick}
                incomeToday={this.state.incomeToday}
                incomeInput={this.state.incomeInput}
              />
            )}
          />
          <Route
            exact
            path="/spendings"
            render={(props) => (
              <Spendings
                {...props}
                item={this.state.item}
                delete={this.delete}
                itemAmount={this.state.itemAmount}
                budget={this.state.budget}
                incomeToday={this.state.incomeToday}
                remainingBudget={this.state.remainingBudget}
                itemList={this.state.itemList}
                handleChange={this.handleChange}
                postSpendings={this.postSpendings}
              />
            )}
          />
          {this.state.incomeToday !== 0 ? (
            <Route
              exact
              path="/history"
              render={(props) => (
                <History
                  {...props}
                  updateBudgetHistory={this.updateBudgetHistory}
                  budgetHistory={this.state.budgetHistory}
                  remainingBudget={this.state.remainingBudget}
                  budgetArr={this.state.budgetArr}
                  dateArr={this.state.dateArr}
                />
              )}
            />
          ) : null}
        </Router>
      </div>
    );
  }
}

export default App;
