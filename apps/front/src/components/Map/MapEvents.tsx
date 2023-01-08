import { useMapEvents } from 'react-leaflet';
import round from '../../utils/round';

interface MapEventsProps {
  onClick: (latitude: number, longitude: number) => void;
}

const MapEvents = ({ onClick }: MapEventsProps) => {
  useMapEvents({
    click: (e) => {
      onClick(round(e.latlng.lat, 5), round(e.latlng.lng, 5));
    },
  });
  return null;
};

export default MapEvents;
