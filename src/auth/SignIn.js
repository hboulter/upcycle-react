import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            username: username,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response.data);

        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div id={"sign-in__container"}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
