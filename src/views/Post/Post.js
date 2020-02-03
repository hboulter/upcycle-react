import React from "react";
import Map from "../../components/Map";
import Form from "./Form";
import "./Post.css";

const Post = props => {
  const googleMapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

  return (
    <div className="body">
      <Map
        google={props.google}
        center={{ lat: 30.2672, lng: -97.7431 }}
        height={"300px"}
        zoom={15}
      />
      <Form />
    </div>
  );
};

export default Post;
