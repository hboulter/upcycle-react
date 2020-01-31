import React, { Component } from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Search from "./Search";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import NavBar from "./NavBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      user: {}
    };
  }

  checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        const { logged_in, user } = response.data;
        if (logged_in) {
          this.setState({
            loggedInStatus: true,
            user
          });
        } else if (!logged_in) {
          this.setState({
            loggedInStatus: false,
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: false,
      user: {}
    });
  };

  handleLogin = data => {
    this.setState({
      loggedInStatus: true,
      user: data.user
    });
    console.log(this.state.user);
  };

  handleSuccessfulAuth = data => {
    this.handleLogin(data);
    this.props.history.push("/"); // redirects user to "/search" page after sign in
  };

  render() {
    return (
      <>
        <NavBar
          handleLogout={this.handleLogout}
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          loggedInStatus={this.state.loggedInStatus}
        />
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Home
                {...props}
                user={this.state.user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          ></Route>
          <Route
            exact
            path={"/search"}
            render={props => (
              <Search {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
          ></Route>
          <Route
            exact
            path="/signin"
            render={props => (
              <SignIn
                {...props}
                handleLogin={this.handleLogin}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUp
                {...props}
                handleLogin={this.handleLogin}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
