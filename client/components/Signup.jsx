import React from "react";

const Signup = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form method="POST" action="/signup">
        <input type="text" placeholder="username"></input>
        <input type="password" placeholder="password"></input>
        <button onClick={handleClick} value="Create User">
          Create User
        </button>
      </form>
    </div>
  );
};

export default Signup;
