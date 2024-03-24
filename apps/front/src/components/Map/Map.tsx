import { MapContainer, Marker as MapMarker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import LocationMarker from './LocationMarker';
import MapEvents from './MapEvents';

import { DEFAULT_COORDS } from '../../utils/constants';
import { Marker } from '../../utils/interfaces';

interface MapProps {
  markers?: Marker[];
  onNewMarker: (latitude: number, longitude: number) => void;
}

export default function CustomMap({ markers, onNewMarker }: MapProps) {
  const theme = useTheme();

  return (
    <Box sx={{ borderRadius: theme.borders.borderRadius }}>
      <MapContainer style={{ minHeight: '200px', width: '100%', height: '100%', borderRadius: 'inherit' }} center={DEFAULT_COORDS} zoom={15}>
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
    </Box>
  );
}

CustomMap.defaultProps = {
  markers: [],
};
