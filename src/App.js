import React, { Component } from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import Home from "./views/Home/Home";
import Search from "./views/Search/Search";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";
import NavBar from "./components/NavBar";
import Post from "./views/Post/Post";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      user: {},
    };
  }

  checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        const { logged_in, user } = response.data;
        if (logged_in) {
          this.setState({
            loggedInStatus: true,
            user,
          });
        } else if (!logged_in) {
          this.setState({
            loggedInStatus: false,
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: false,
      user: {},
    });
  };

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: true,
      user: data.user,
    });
    console.log(this.state.user);
  };

  handleSuccessfulAuth = (data) => {
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
            render={(props) => (
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
            path={"/search"}
            render={(props) => (
              <Search
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          ></Route>
          <Route
            path="/signin"
            render={(props) => (
              <SignIn
                {...props}
                handleLogin={this.handleLogin}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <SignUp
                {...props}
                handleLogin={this.handleLogin}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
          />
          <Route path="/post" render={() => <Post user={this.state.user} />} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
