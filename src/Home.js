import React from "react";
import HomeContainer from "./HomeContainer";

const Home = ({ loggedInStatus }) => {
  return (
    <div className="header">
      <h1>UPCYCLE</h1>
      <p>Status: {loggedInStatus}</p>
      <HomeContainer />
    </div>
  );
};

export default Home;
