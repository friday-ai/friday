import { useMapEvents } from 'react-leaflet';

import { LeafletMouseEvent } from 'leaflet';
import { round } from '../../utils/number';

interface MapEventsProps {
  onClick: (latitude: number, longitude: number) => void;
}

export default function MapEvents({ onClick }: MapEventsProps) {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      onClick(round(e.latlng.lat, 5), round(e.latlng.lng, 5));
    },
  });
  return null;
}
