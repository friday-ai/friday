import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

import { DEFAULT_COORDS } from '../../utils/constants';

export default function LocationMarker() {
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
