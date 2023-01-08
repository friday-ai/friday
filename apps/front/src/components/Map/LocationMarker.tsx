import React, { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import { DEFAULT_COORDS } from '../../utils/constants';

function LocationMarker() {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_COORDS);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
