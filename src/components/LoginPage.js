// This component does a couple of things, firstly it displays the elements of a login page as well as fetches the credentials from my server to see if the credentials entered match any that are contained within the server. It also sets which user is logged in so that the username can be displayed within the NavBar component

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";

function LoginPage({ setIsLoggedIn, setLoggedInUsername }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:8000/credentials")
      .then((response) => response.json())
      .then((data) => {
        const matchingCredentials = data.find(
          (credentials) =>
            credentials.username === username &&
            credentials.password === password
        );
        if (matchingCredentials) {
          setIsLoggedIn(true);
          setLoggedInUsername(matchingCredentials.username);
          navigate("/home");
        } else {
          setLoginError(true);
        }
      });
  }

  return (
    <div className="LoginPage">
      <h2 id="title">Login</h2>
      <form onSubmit={handleLogin} id="InputsAndButton">
        <div id="UsernamePassword">
          <div id="Username">
            <label id="UserText" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="UserField"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div id="Pasword">
            <label id="PasswordText" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="PasswordField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {loginError && (
          <p className="error-message">Invalid username and/or password.</p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
