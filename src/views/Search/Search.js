import React from "react";
import axios from "axios";
import Content from "./Content";
import SearchBar from "./SearchBar";
import "./Container.css";

const API = "http://localhost:3001/posts";

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      searchInput: ""
    };
  }

  handleSearchInput = event => {
    this.setState({
      searchInput: event.target.value
    });
  };

  componentDidMount() {
    axios
      .get(API)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="body">
        <SearchBar
          searchInput={this.state.searchInput}
          handleSearchInput={this.handleSearchInput}
        />
        <br />
        <Content
          posts={this.state.posts}
          searchInput={this.state.searchInput}
        />
      </div>
    );
  }
}

export default Container;
