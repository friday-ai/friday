import React from 'react';
import { MapContainer, Marker as MapMarker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import LocationMarker from './LocationMarker';
import MapEvents from './MapEvents';

import { DEFAULT_COORDS } from '../../utils/constants';
import { Marker } from '../../utils/interfaces';

interface MapProps {
  markers?: Marker[];
  onNewMarker: (latitude: number, longitude: number) => void;
}

export default function Map({ markers, onNewMarker }: MapProps) {
  return (
    <MapContainer style={{ minHeight: '200px', width: '100%', height: '100%' }} center={DEFAULT_COORDS} zoom={15}>
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
