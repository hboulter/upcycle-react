import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = ({ loggedInStatus }) => {
  return (
    <div className="header">
      <h1 className="heading-primary">UPCYCLE</h1>
      <h3 className="heading-secondary">You find. You share. You claim.</h3>
      {loggedInStatus ? (
        <Link to="/post" className="button button__primary">
          Post
        </Link>
      ) : (
        <> </>
      )}
      <Link to="/search" className="button button__primary">
        Search
      </Link>
    </div>
  );
};

export default Home;
