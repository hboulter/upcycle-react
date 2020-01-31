import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const link = {
  background: "gray",
  color: "white",
  cursor: "pointer",
  margin: "0 6px 6px",
  padding: "12px",
  textDecoration: "none",
  width: "100px"
};

const Navbar = ({ handleLogout, handleSuccessfulAuth, loggedInStatus }) => {
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
  return (
    <div className="nav-bar">
      {loggedInStatus ? (
        <span style={link} onClick={() => handleLogoutClick()}>
          Logout
        </span>
      ) : (
        <>
          <NavLink
            to="/signin"
            exact
            style={link}
            activeStyle={{
              background: "darkblue"
            }}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            exact
            style={link}
            activeStyle={{
              background: "darkblue"
            }}
          >
            Sign Up
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
