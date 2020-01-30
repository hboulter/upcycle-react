import React, { Component } from "react";
import axios from "axios";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/search"); // redirects user to "/search" page after sign in
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
    this.props.handleLogout();
  }

  render() {
    return (
      <div>
        <h1>UPCYCLE</h1>
        <h1>
          Status: {this.props.loggedInStatus}
          {/* {this.props.loggedInStatus === "LOGGED_IN"
            ? this.props.username
            : null} */}
        </h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <SignUp handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <SignIn handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default Home;
