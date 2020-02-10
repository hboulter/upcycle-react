import React, { useState } from "react";
import Map from "../../components/PostMap";
import Geocode from "react-geocode";
import Form from "./Form";
import "./Post.css";

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_KEY}`);
Geocode.enableDebug();

const Post = ({ google, user }) => {
  const [lat, setLat] = useState(33.5979);
  const [lng, setLng] = useState(-117.873);
  const [address, setAddress] = useState({});
  const getAddress = () => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const {
          results: [{ address_components }]
        } = response;

        const addrArr = address_components.map(comp => comp.short_name);
        const address = addrArr.join(" ");
        setAddress(address);
      },
      error => {
        console.error(error);
      }
    );
  };
  getAddress();
  return (
    <div className="body">
      <Map
        address={address}
        center={{ lat, lng }}
        google={google}
        height={"500px"}
        setLat={setLat}
        setLng={setLng}
        zoom={15}
      />
      <Form user={user} lat={lat} lng={lng} />
    </div>
  );
};

export default Post;
