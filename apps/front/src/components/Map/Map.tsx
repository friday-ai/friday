import React from 'react';
import { MapContainer, TileLayer, Marker as MapMarker, Popup } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import MapEvents from './MapEvents';
import { Marker } from '../../utils/interfaces';
import { DEFAULT_COORDS } from '../../utils/constants';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  markers?: Marker[];
  onNewMarker: (latitude: number, longitude: number) => void;
}

function Map({ markers, onNewMarker }: MapProps) {
  return (
    <MapContainer className="w-full h-full card" center={DEFAULT_COORDS} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onClick={onNewMarker} />
      <LocationMarker />

      {markers?.map((marker) => (
        <MapMarker key={JSON.stringify(marker)} position={marker.position}>
          {marker.title !== '' && <Popup>{marker.title}</Popup>}
        </MapMarker>
      ))}
    </MapContainer>
  );
}

Map.defaultProps = {
  markers: [],
};

export default Map;
