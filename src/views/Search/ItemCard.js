import React from "react";

const ItemCard = props => {
  return (
    <div>
      <h3>{props.post.title}</h3>
      <img src={props.image} alt="oh no!" />
    </div>
  );
};

export default ItemCard;
