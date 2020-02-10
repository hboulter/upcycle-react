import React, { Component } from "react";
import axios from "axios";
import Content from "./Content";
import SearchBar from "./SearchBar";
import "./Container.css";

const API = "http://localhost:3001/posts";

class Container extends Component {
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

  changePost = e => {
    let posts = this.state.posts.filter(
      post => post.post.id !== parseInt(e.target.value)
    );
    this.setState({ posts: posts });
    axios
      .patch(`http://localhost:3001/update/${e.target.value}`, {
        post: {
          status: false
        }
      })
      .then(response => console.log(response));
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
          loggedInStatus={this.props.loggedInStatus}
          user={this.props.user}
          changePost={this.changePost}
        />
      </div>
    );
  }
}

export default Container;
