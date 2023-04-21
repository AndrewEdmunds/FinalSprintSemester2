// This component accepts some props from other components so that it can do different things like display the users username and sign them out. otherwise it just contains the header for the page
import { ReactComponentElement, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navBar.css";

const NavBar = ({ isLoggedIn, username, handleLogout, loggedInUsername }) => {
  useEffect(() => {
    console.log("Username prop updated to:", username);
  }, [username]);
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    navigate("/LoginPage");
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <h1 id="Title">Pic Findr</h1>
          <div className="links">
            <Link className="link" to="/">
              <p>Sign Up!</p>
            </Link>
            <Link className="link" to="/LoginPage">
              <p>Login Now</p>
            </Link>
            <Link className="link" to="/home">
              <p>Pic Findr</p>
            </Link>
            {isLoggedIn && (
              <div className="user-info">
                <button className="link" onClick={handleSignOut}>
                  Sign Out
                </button>
                <p>{loggedInUsername}</p>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
