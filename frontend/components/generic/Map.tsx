import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        attribution=':)'
      />
      {/* <Marker position={[40.8054, -74.0241]} draggable={true}>
        <Popup>Hey ! I live here</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;