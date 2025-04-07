import { useState, useRef, useMemo } from 'react';
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter = { lat: -19.0476, lng: -65.2599 };

export const MapaInteractivo = ({ initialPosition = defaultCenter, onChange }:
    {
    initialPosition?: { lat: number; lng: number };
    onChange?: (position: { lat: number; lng: number }) => void;
    }
) => {
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        if (markerRef.current) {
          const newPos = markerRef.current.getLatLng();
          setPosition(newPos);
          if (onChange) onChange(newPos);
        }
      },
    }),
    [onChange]
  );

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker draggable eventHandlers={eventHandlers} position={position} ref={markerRef}>
        <Popup minWidth={90}>
          <span style={{ cursor: 'pointer' }}>Arrastra el marcador para seleccionar la ubicación</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
