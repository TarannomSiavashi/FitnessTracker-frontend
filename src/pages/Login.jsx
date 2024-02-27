import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./page-styles/Login.css";
import { post } from '../utils/httpClient'


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("Username:", username);
    // console.log("Password:", password);
    const loginData = {
        username : username,
        password : password,
    };
    // post('/login', JSON.stringify(loginData));
    post('/login', loginData);
  } 

  return (
    <div className="container">
      <h1 id="login_header">Login</h1>
      <div id="form">
        <div className="partition">
          <label id="labelLogin">Username</label>
          <input
            id="username"
            type="text"
            // placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="partition">
          <label id="labelLogin" color="red">Password</label>
          <input
            id="pass"
            type="password"
            // placeholder="Password"
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

// ReactDOM.render(
//   <React.StrictMode>
//     <LoginPage />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

export default LoginPage;
