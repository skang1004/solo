import React, { Component } from "react";

const Login = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  const handleText = (e) => {
    console.log(e.target.value);
  };
  return (
    <div id="login">
      <form>
        <input placeholder="username" type="text" onChange={handleText}></input>
        <input
          placeholder="password"
          type="password"
          onChange={handleText}
        ></input>
        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
