import React, { Component } from "react";
import axios from "axios";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      SignUpErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, password, password_confirmation } = this.state;
    axios
      .post(
        "https://afternoon-river-07186.herokuapp.com/users",
        {
          user: {
            username: username,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => this.props.handleSuccessfulAuth(response.data))
      .catch(error => {
        alert("Invalid submission. Username taken or password does not match.");
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="background">
        <div id="sign-up__container">
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
            <div className="form__group">
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="form__input"
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
              />
              <label for="password_confirmation" className="form__label">
                Password Confirmation
              </label>
            </div>
            <button type="submit" className="button button__primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
