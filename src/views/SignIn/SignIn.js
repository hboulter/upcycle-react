import React, { Component } from "react";
import axios from "axios";
import "./SignIn.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginErrors: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { username, password } = this.state;
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            username: username,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);

        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
        if (!response.data.logged_in) {
          alert("Incorrect username or password.");
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="background">
        <div id={"sign-in__container"}>
          <form onSubmit={this.handleSubmit}>
            <div className="form__group">
              <input
                autoComplete="off"
                type="username"
                name="username"
                id="username"
                className="form__input"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
              <label for="username" className="form__label">
                Username
              </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                name="password"
                id="password"
                className="form__input"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label for="password" className="form__label">
                Password
              </label>
            </div>
            <button type="submit" className="button button__primary">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
