import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = ({ handleLogout, loggedInStatus }) => {
  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(_response => {
        handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
    handleLogout();
  };

  const activeStyles = {
    borderBottom: "1px solid grey",
    transition: "all 0.3s ease-in-out"
  };
  return (
    <div>
      <div className="nav-bar">
        <div className="header__logo-box">
          <img src="logo.png" alt="Logo" className="header__logo" />
        </div>
        <NavLink to="/" exact className={"button"} activeStyle={activeStyles}>
          Home
        </NavLink>
        {loggedInStatus ? (
          <NavLink
            to="/post"
            exact
            className={"button"}
            activeStyle={activeStyles}
          >
            Post
          </NavLink>
        ) : (
          <></>
        )}
        <NavLink
          to="/search"
          exact
          className={"button"}
          activeStyle={activeStyles}
        >
          Search
        </NavLink>
        {loggedInStatus ? (
          <span
            className={"button button__primary"}
            onClick={() => handleLogoutClick()}
          >
            Logout
          </span>
        ) : (
          <>
            <NavLink
              to="/signin"
              exact
              className={"button button__primary"}
              activeStyle={{
                background: "darkblue"
              }}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              exact
              className={"button button__secondary"}
              activeStyle={{
                background: "darkblue"
              }}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
