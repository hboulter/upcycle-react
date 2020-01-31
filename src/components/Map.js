import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import React from "react";

const Map = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
      >
        {props.isMarkerShown && (
          <Marker position={{ lat: 30.2672, lng: -97.7431 }} />
        )}
      </GoogleMap>
    );
  })
);

export default Map;
