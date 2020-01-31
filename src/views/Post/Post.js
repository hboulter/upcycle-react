import React from "react";
import Map from "../../components/Map";

const Post = () => {
  const googleMapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;
  return (
    <Map
      googleMapURL={googleMapUrl}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      isMarkerShown={true}
    />
  );
};

export default Post;
