// here i route the user to the correct pages as well as act as a parent component for the information that needs to bo between seperate components

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import PicSlider from "./components/PicSlider";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");

  function handleLogin(username) {
    setIsLoggedIn(true);
    setUsername(username);
    setLoggedInUsername(username);
    console.log("Username is now:", username);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUsername("");
    setLoggedInUsername("");
  }

  return (
    <Router>
      <div className="App">
        <NavBar
          loggedInUsername={loggedInUsername}
          isLoggedIn={isLoggedIn}
          username={username}
          handleLogout={handleLogout}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/home" element={<PicSlider />} />
            <Route
              path="/LoginPage"
              element={
                <LoginPage
                  setLoggedInUsername={setLoggedInUsername}
                  onLogin={handleLogin}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Routes>
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
