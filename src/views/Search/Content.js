import React from "react";
import ItemCard from "./ItemCard";

const Content = ({ posts, searchInput, loggedInStatus, user }) => {
  return (
    <div>
      {posts
        .filter(post =>
          post.post.title.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(({ post, image }) => (
          <ItemCard
            key={post.id}
            post={post}
            image={image}
            loggedInStatus={loggedInStatus}
            user={user}
          />
        ))}
    </div>
  );
};

export default Content;
