import React from "react";
import "./Home.css";

const Home = ({ loggedInStatus }) => {
  return (
    <div className="header">
      <h1 className="heading-primary">UPCYCLE</h1>
      <button className="button">Post</button>
      <button className="button">Search</button>
    </div>
  );
};

export default Home;
