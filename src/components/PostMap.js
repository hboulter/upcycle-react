import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import "./Map.css";

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

class PostMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onPlaceSelected = place => {
    this.props.setLat(place.geometry.location.lat());
    this.props.setLng(place.geometry.location.lng());
    // Set these values in the state.
    this.setState({
      showInfoWindow: true
    });
  };

  getCurrentLocation = () => {
    const { setLat, setLng } = this.props;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        this.setState({
          showInfoWindow: false
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <>
          <GoogleMap
            google={this.props.google}
            defaultOptions={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              zoomControl: false
            }}
            defaultZoom={this.props.zoom}
            defaultCenter={{
              lat: this.props.center.lat,
              lng: this.props.center.lng
            }}
          >
            <span
              id="currentLocation__button"
              className="button button__primary"
              onClick={() => this.getCurrentLocation()}
            >
              Current Location
            </span>
            <Autocomplete
              className="autocomplete__input"
              onPlaceSelected={this.onPlaceSelected}
              types={"address"}
            />
            {this.state.showInfoWindow ? (
              <InfoWindow
                position={{
                  lat: this.props.center.lat + 0.0018,
                  lng: this.props.center.lng
                }}
              >
                <div>
                  <span style={{ padding: 0, margin: 0 }}>
                    {this.props.address}
                  </span>
                </div>
              </InfoWindow>
            ) : (
              <></>
            )}
            <Marker
              google={this.props.google}
              name={"Dolores park"}
              draggable={false}
              position={{
                lat: this.props.center.lat,
                lng: this.props.center.lng
              }}
            />
            <Marker />
          </GoogleMap>
        </>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div id="google-maps__container">
          <AsyncMap
            googleMapURL={googleMapUrl}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

export default PostMap;
