import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./page-styles/Login.css";
import { post } from '../utils/httpClient'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    let loginData = {
      username: username,
      password: password,
    };

    try {
      const userData = await post("/login", loginData);
      const userObject = userData[0];
      navigate(`/home/${userObject.id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1 id="login_header">Login</h1>
      {errorMessage && <div className="error-message">Invalid Login! Please try again.</div>}
      <div id="form">
        <div className="partition">
          <label id="labelLogin">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="partition">
          <label id="labelLogin" color="red">Password</label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleLogin} className="button">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

