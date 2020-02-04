import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

class Map extends Component {
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
          <button onClick={() => this.getCurrentLocation()}>
            Current Location
          </button>
          <GoogleMap
            google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{
              lat: this.props.center.lat,
              lng: this.props.center.lng
            }}
          >
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
            <Autocomplete
              style={{
                width: "100%",
                height: "35px",
                paddingLeft: "16px",
                marginTop: "5px",
                marginBottom: "100px"
              }}
              onPlaceSelected={this.onPlaceSelected}
              types={"address"}
            />
          </GoogleMap>
        </>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
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

export default Map;
