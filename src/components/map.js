import GoogleMapReact from "google-map-react";
import React from "react";

const Map = (props) => {
  const [zoom, setZoom] = React.useState(11);
    return (
        <div style={{ height: "500px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBb_903sk414N5BTdsDWXowkw9B-SjsVtA" }}
            defaultCenter={props.coord}
            defaultZoom={zoom}
          >
            <Marker lat={props.coord.lat} lng={props.coord.lng} />
          </GoogleMapReact>
        </div>
      );
}

const Marker = () => <div style={{ color: "red", fontSize: "25px" }}>📍</div>;

export default Map;