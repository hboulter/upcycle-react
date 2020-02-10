import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

const SearchMap = ({ center, height, zoom }) => {
  const AsyncMap = withScriptjs(
    withGoogleMap(() => (
      <>
        <GoogleMap
          defaultZoom={zoom}
          defaultOptions={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          }}
          defaultCenter={{
            lat: center.lat,
            lng: center.lng
          }}
        >
          <Marker
            name={"Dolores park"}
            draggable={false}
            position={{
              lat: center.lat,
              lng: center.lng
            }}
          />
        </GoogleMap>
      </>
    ))
  );
  return (
    <AsyncMap
      googleMapURL={googleMapUrl}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: height }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default SearchMap;
