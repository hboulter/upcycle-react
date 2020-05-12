import React from "react";
import SearchMap from "../../components/SearchMap";

const ItemDetail = ({
  post: { condition, description, lat, lng, title, id },
  image,
  showDetail,
  setShowDetail,
  updatePostStatus,
}) => {
  console.log(id);

  return (
    <>
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
            <SearchMap center={{ lat, lng }} height={"500px"} zoom={14} />
          </div>
          <div className={"quickview__details vl"}>
            <div className="quickview__image">
              <img
                className="quickview__image"
                src={`http://localhost:3001/${image}`}
                alt="oh no!"
                style={{ maxWidth: "100%" }}
                width="auto"
                height="275px"
              />
            </div>
            <div>
              <h3 className="quickview__info">
                {title} • {condition}
              </h3>
              <div className="quickview__description">
                <p>{description}</p>
              </div>
            </div>
            <button
              value={id}
              className="claim button button__primary"
              onClick={(e) => updatePostStatus(e)}
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
