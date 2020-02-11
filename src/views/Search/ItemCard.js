import React, { useState } from "react";
import ItemDetail from "./ItemDetail";

const ItemCard = ({ post, image, loggedInStatus, changePost }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetails = () => {
    if (loggedInStatus) {
      setShowDetail(!showDetail);
    } else {
      alert("Must be signed in to view.");
    }
  };

  const updatePostStatus = e => {
    setShowDetail(!showDetail);
    changePost(e);
  };

  return (
    <>
      <span className="column card" onClick={() => handleShowDetails()}>
        <img
          src={`http://localhost:3001/${image}`}
          alt="oh no!"
          style={{ maxWidth: "100%" }}
          width="auto"
          height="250px"
        />
        <h3>{post.title}</h3>
      </span>
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
    </>
  );
};

export default ItemCard;
