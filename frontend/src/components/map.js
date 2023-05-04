import GoogleMapReact from "google-map-react";
// import { GoogleMap, InfoBox, Marker } from "@react-google-maps/api";
import React from "react";

const Map = (props) => {
  const [zoom, setZoom] = React.useState(11);

  const [map, setMap] = React.useState(null);
  React.useEffect(() => {
    if (map) {
      map.panTo({ lat: props.coord.lat, lng: props.coord.lng });
      map.setZoom(11); // set appropriate zoom level
    }
  }, [props.coord, map]);

  const handleApiLoaded = (map, maps) => {
    setMap(map);
  };

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBb_903sk414N5BTdsDWXowkw9B-SjsVtA" }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        center={{ lat: props.coord.lat, lng: props.coord.lng }}
        zoom={12}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <Marker lat={props.coord.lat} lng={props.coord.lng} />
      </GoogleMapReact>
    </div>
  );

  // console.log(props.coord);
  // return (
  //   <div style={{ height: "500px", width: "100%" }}>
  //     <GoogleMapReact
  //       bootstrapURLKeys={{ key: "AIzaSyBb_903sk414N5BTdsDWXowkw9B-SjsVtA" }}
  //       defaultCenter={props.coord}
  //       defaultZoom={zoom}
  //     >
  //       <Marker lat={props.coord.lat} lng={props.coord.lng} />
  //       {/* <InfoBox position={{lat:props.lat , lng:props.lng}} ><h1>{props.temp}</h1></InfoBox>
  //       <Marker position={{lat:props.lat , lng:props.lng} } ></Marker> */}
  //     </GoogleMapReact>
  //   </div>
  // );
};

const Marker = ({ lat, lng }) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <img src="marker.png" alt="Marker" style={{ width: 32, height: 32 }} />
  </div>
);

// const Marker = () => <div style={{ color: "red", fontSize: "25px" }}>📍</div>;

export default Map;
