import React, { Component } from "react";
import App from "../App.jsx";
import Signup from "./Signup.jsx";
import { Route, Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: "",
      password: "",
      verified: false,
    };
    this.signUpClick = this.signUpClick.bind(this);
  }
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  // const handleText = (e) => {
  //   console.log(e.target.value);
  // };

  signUpClick(e) {
    e.preventDefault();
    let un = document.getElementById("sign_us");
    un = un.value;
    let pw = document.getElementById("sign_pw");
    pw = pw.value;
    const body = {
      username: un,
      password: pw,
    };
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          username: data.user.username,
          verified: data.verified,
        });
      });
  }

  handleClick(e) {
    e.preventDefault();
    let un = document.getElementById("log_us");
    un = un.value;
    let pw = document.getElementById("log_pw");
    pw = pw.value;
    const body = {
      username: un,
      password: pw,
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          username: data.user[0].username,
          verified: data.verified,
        });
      });
  }

  render() {
    return (
      <div>
        {!this.state.verified ? (
          <div id="login">
            <div>Sign In</div>
            <form>
              <input id="log_us" placeholder="username" type="text"></input>
              <input id="log_pw" placeholder="password" type="password"></input>
              <button
                className="buttons"
                type="submit"
                onClick={this.handleClick}
              >
                Login
              </button>
            </form>
            <div id="signUpDiv">Dont have an account? Sign Up</div>
            <form>
              <input id="sign_us" placeholder="username" type="text"></input>
              <input
                id="sign_pw"
                placeholder="password"
                type="password"
              ></input>
              <button
                className="buttons"
                type="submit"
                onClick={this.signUpClick}
              >
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <App username={this.state.username} />
        )}
      </div>
    );
  }
}

export default Login;
