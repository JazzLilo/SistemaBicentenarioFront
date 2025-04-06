import { useState, useRef, useMemo, useCallback } from 'react';
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const center = {
  lat: -19.6133,
  lng: -65.7533,
};

const DraggableMarker = () => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<L.Marker>(null);
  const [position, setPosition] = useState(center);
  
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        setPosition(marker.getLatLng());
      }
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
        <span onClick={toggleDraggable}>
          {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

const MapWithDraggableMarker = () => {
  return (
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
};

export default MapWithDraggableMarker;