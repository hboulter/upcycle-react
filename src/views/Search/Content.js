import React from "react";
import ItemCard from "./ItemCard";

const Content = ({ posts, searchInput }) => {
  return (
    <div>
      {posts
        .filter(post =>
          post.post.title.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(post => (
          <ItemCard key={post.post.id} post={post.post} image={post.image} />
        ))}
    </div>
  );
};

export default Content;
