import React from "react";
import ItemCard from "./ItemCard";
import "./Content.css";

const Content = ({ posts, searchInput, loggedInStatus, user, changePost }) => {
  return (
    <div className="grid" id="post__container">
      {posts
        .filter(
          ({ post }) =>
            post.title.toLowerCase().includes(searchInput.toLowerCase()) &&
            post.status !== false
        )
        .map(({ post, image }) => (
          <ItemCard
            key={post.id}
            post={post}
            image={image}
            loggedInStatus={loggedInStatus}
            user={user}
            posts={posts}
            changePost={changePost}
          />
        ))}
    </div>
  );
};

export default Content;
