import React, { useState } from "react";
import Map from "../../components/Map";
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
      res => {
        const {
          results: [{ address_components }]
        } = res;

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
        height={"300px"}
        setLat={setLat}
        setLng={setLng}
        zoom={15}
      />
      <br />
      <br />
      <br />
      <Form user={user} lat={lat} lng={lng} />
    </div>
  );
};

export default Post;
