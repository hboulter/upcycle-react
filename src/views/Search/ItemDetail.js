import React from "react";
import SearchMap from "../../components/SearchMap";

const ItemDetail = ({
  post: { condition, description, lat, lng, title, id },
  showDetail,
  setShowDetail,
  updatePostStatus
}) => {
  console.log(id);

  return (
    <div className={"item-detail__quickview"}>
      <div className={"quickview__modal"}>
        <span
          className="close-button"
          onClick={() => setShowDetail(!showDetail)}
        >
          &times;
        </span>
        <br />
        <div className={"quickview__map"}>
          <SearchMap center={{ lat, lng }} height={"300px"} zoom={12} />
        </div>
        <div className={"quickview__details"}>
          Type: {title}
          <br />
          Condition: {condition}
          <br />
          Description: {description}
          <br />
          <br />
          <button
            value={id}
            className="button button__primary"
            onClick={e => updatePostStatus(e)}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
