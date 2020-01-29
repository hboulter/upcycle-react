import React, { Component } from "react";
import SignUp from "./auth/SignUp";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <SignUp />
      </div>
    );
  }
}

export default Home;
