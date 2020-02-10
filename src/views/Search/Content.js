import React from "react";
import ItemCard from "./ItemCard";

const Content = ({ posts, searchInput, loggedInStatus, user, changePost }) => {
  return (
    <div>
      {posts
        .filter(
          post =>
            post.post.title.toLowerCase().includes(searchInput.toLowerCase()) &&
            post.post.status !== false
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
