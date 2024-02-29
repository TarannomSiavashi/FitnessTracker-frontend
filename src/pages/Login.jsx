// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import "./page-styles/Login.css";
// import { post } from '../utils/httpClient'
// import { Navigate } from "react-router-dom";


// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);

//   const handleLogin = async () => {
//     // console.log("Username:", username);
//     // console.log("Password:", password);
//     const loginData = {
//         username : username,
//         password : password,
//     };
//     const userData = await post('/login', loginData);
//     setUser(userData);
//     console.log(user);
//     console.log(userData);
//   };

//   if(user){
//     return <Navigate to="/home" state={{ user: user }} />;

//   }

//   return (
//     <div className="container">
//       <h1 id="login_header">Login</h1>
//       <div id="form">
//         <div className="partition">
//           <label id="labelLogin">Username</label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div className="partition">
//           <label id="labelLogin" color="red">Password</label>
//           <input
//             id="pass"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button type="button" onClick={handleLogin} className="button">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

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
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   const loginData = {
  //     username: username,
  //     password: password,
  //   };
  //   try {
  //     const userData = await post('/login', loginData);
  //     const userObject = userData[0];
  //     navigate(`/home/${user}`); // Pass userId as state
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  const handleLogin = async () => {
    const loginData = {
      username: username,
      password: password,
    };
    const userData = await post('/login', loginData);
    const userObject = userData[0];
    navigate(`/home/${userObject.id}`);
    setUser(userObject);
  };

  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //     console.log("User logged in successfully!");
  //   }
  // }, [user]);


  // if (user) {
  //   console.log("usr::");
  //   console.log(user);
  //   return <Navigate to="/home/${user}"/>;
  // }

  return (
    <div className="container">
      <h1 id="login_header">Login</h1>
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

