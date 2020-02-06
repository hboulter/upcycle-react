import React from "react";

const ItemCard = props => {
  console.log(props.image);

  return (
    <div className="card column row">
      <img
        src={`http://localhost:3001/${props.image}`}
        alt="oh no!"
        width="250px"
        height="250px"
      />
      <h3>{props.post.title}</h3>
    </div>
  );
};

export default ItemCard;
