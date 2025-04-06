import { useState, useRef, useMemo, useCallback } from 'react';
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para iconos missing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const center = {    lat: -19.6133,
  lng: -65.7533,};

const DraggableMarker = () => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<L.Marker>(null);
  const [position, setPosition] = useState(center);

  const eventHandlers = useMemo(() => ({
    dragend() {
      markerRef.current && setPosition(markerRef.current.getLatLng());
    },
  }), []);

  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable} style={{ cursor: 'pointer' }}>
          {draggable ? 'Marker is draggable' : 'Click to make draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

const MapWrapper = () => (
  <div style={{ height: '100vh', width: '100%' }}>
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  </div>
);

const App = () => <MapWrapper />;

export default App;