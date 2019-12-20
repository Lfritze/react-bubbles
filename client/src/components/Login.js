import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post(`/api/login`, login)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push(`/homepage`);
      })
      .catch(err => console.log(`error logging in`, err));
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className="login-div">
      <h1>Welcome to the Bubble App!</h1>
      <p>Login here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="login-input"
          value={login.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="login-input"
          value={login.password}
          onChange={handleChange}
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
