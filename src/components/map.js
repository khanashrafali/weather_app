import GoogleMapReact from "google-map-react";
// import { GoogleMap, InfoBox, Marker } from "@react-google-maps/api";
import React from "react";

const Map = (props) => {
  const [zoom, setZoom] = React.useState(11);
  // console.log(props.coord);
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBb_903sk414N5BTdsDWXowkw9B-SjsVtA" }}
        defaultCenter={props.coord}
        defaultZoom={zoom}
      >
        <Marker lat={props.coord.lat} lng={props.coord.lng} />
        {/* <InfoBox position={{lat:props.lat , lng:props.lng}} ><h1>{props.temp}</h1></InfoBox>
        <Marker position={{lat:props.lat , lng:props.lng} } ></Marker> */}
      </GoogleMapReact>
    </div>
  );
};

const Marker = () => <div style={{ color: "red", fontSize: "25px" }}>📍</div>;

export default Map;
