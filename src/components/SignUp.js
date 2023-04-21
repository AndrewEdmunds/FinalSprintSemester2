// this page allows the user to sign in. if an account is successfully created it will push the credentials to my server so that they may be fetched within the login component. other than that it displays the elements for the sign up page

import { useState, useEffect } from "react";
import "../styles/signUpPage.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credentialsArray, setCredentialsArray] = useState([]);
  const [accountCreated, setAccountCreated] = useState(false);
  const [lastId, setLastId] = useState(localStorage.getItem("lastId") || 0);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handleUpdateCredentials() {
    if (password === confirmPassword) {
      const credentials = {
        id: parseInt(lastId) + 1,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      };
      setCredentialsArray([...credentialsArray, credentials]);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setAccountCreated(true);
      setLastId(parseInt(lastId) + 1);
      localStorage.setItem("lastId", parseInt(lastId) + 1);
      fetch("http://localhost:8000/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then(() => {
        console.log("done");
      });
    } else {
      alert("Passwords do not match.");
    }
  }

  useEffect(() => {
    console.log(credentialsArray);
  }, [credentialsArray]);

  return (
    <div id="SignUpPage">
      <h1 id="inPageTitle">Sign Up Now!</h1>
      <form id="labelsInputs">
        <label className="fieldItem">Username: </label>
        <input
          className="fieldItem"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className="fieldItem">Password: </label>
        <input
          className="fieldItem"
          type="text"
          id="Password"
          name="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label className="fieldItem">Confirm Password: </label>
        <input
          className="fieldItem"
          type="text"
          id="ConfirmPassword"
          name="ConfirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </form>
      <button id="signUpButton" onClick={handleUpdateCredentials}>
        Sign Up!
      </button>
      {accountCreated && <p>Account created successfully!</p>}
    </div>
  );
};

export default SignUp;
