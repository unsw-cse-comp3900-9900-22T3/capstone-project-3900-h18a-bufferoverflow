import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// const position: LatLngTuple = [-33.8688, 151.2093] ;

export default function Map (props: {
    position: LatLngTuple
    radius?: number
}) {
  return (
    <MapContainer
      center={props.position}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        attribution=':)'
      />
      <Circle center={props.position} radius={props.radius ? props.radius : 10}></Circle>
    </MapContainer>
  );
};

