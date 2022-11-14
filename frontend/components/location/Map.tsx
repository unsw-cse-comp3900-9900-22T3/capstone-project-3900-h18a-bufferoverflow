import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

export default function Map(props: {
  width: number;
  height: number;
  position: LatLngTuple;
  radius?: number;
}) {
  return (
    <Box sx={{ width: props.width, height: props.height }}>
      <MapContainer
        center={props.position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution="© OpenSteetMap contributors"
        />
        {props.radius ? (
          <Circle center={props.position} radius={props.radius} />
        ) : null}
      </MapContainer>
    </Box>
  );
}
