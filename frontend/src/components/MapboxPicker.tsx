import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  onSelect: (lat: number, lng: number) => void;
}

const MapboxPicker = ({ onSelect }: Props) => {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        latitude: 5.389,
        longitude: 6.986,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      style={{ height: 300 }}
      onClick={(e) => onSelect(e.lngLat.lat, e.lngLat.lng)}
    >
      <Marker latitude={5.389} longitude={6.986} />
    </Map>
  );
};

export default MapboxPicker;
