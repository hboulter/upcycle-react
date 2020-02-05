import React from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import "./Search.css";

const API = "http://localhost:3001/posts";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

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
      <div>
        {this.state.posts.map(post => (
          <ItemCard key={post.post.id} post={post.post} image={post.image} />
        ))}
      </div>
    );
  }
}

export default Search;
