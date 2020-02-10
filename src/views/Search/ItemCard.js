import React, { useState } from "react";
import ItemDetail from "./ItemDetail";

const ItemCard = ({ post, image, loggedInStatus }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [newStatus, setNewStatus] = useState(post.status);
  // const [showPost, setShowPost] = useState(post.id);

  const handleShowDetails = () => {
    if (loggedInStatus) {
      setShowDetail(!showDetail);
    } else {
      alert("Must be signed in to view.");
    }
  };

  const updatePostStatus = () => {
    setNewStatus(false);
    setShowDetail(!showDetail);
  };

  return (
    <div>
      <div className="column card" onClick={() => handleShowDetails()}>
        <img
          src={`http://localhost:3001/${image}`}
          alt="oh no!"
          style={{ maxWidth: "100%" }}
          width="auto"
          height="250px"
        />
        <h3>{post.title}</h3>
      </div>
      {showDetail ? (
        <ItemDetail
          post={post}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          updatePostStatus={updatePostStatus}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemCard;
