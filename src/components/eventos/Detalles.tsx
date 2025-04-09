import { useAtom } from "jotai";
import { eventoAtom } from "@/context/context";
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuración de iconos para el mapa
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const DetallesEvento = () => {
  const [evento] = useAtom(eventoAtom);

  if (!evento) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Selecciona un evento histórico</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda - Imagen y nombre */}
        <div className="space-y-4">
          <img
            src={evento.imagen}
            alt={evento.nombre}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            {evento.nombre}
          </h2>
        </div>

        {/* Columna derecha - Detalles */}
        <div className="space-y-6">
          {/* Sección de Información Básica */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-blue-600">📅 Información del Evento</span>
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Fecha:</span>{" "}
                {new Date(evento.fecha_hora).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Organizador:</span>{" "}
                {evento.organizador.nombre} {evento.organizador.apellidoPaterno}
              </p>
            </div>
          </div>

          {/* Sección de Descripción */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-green-600">📜 Descripción</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {evento.descripcion}
            </p>
          </div>

          {/* Mapa de ubicación */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-orange-600">📍 Ubicación</span>
            </h3>
            <div className="h-48 rounded-lg overflow-hidden">
              <MapContainer
                center={[evento.ubicacion.latitud, evento.ubicacion.longitud]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={[evento.ubicacion.latitud, evento.ubicacion.longitud]}
                >
                  <Popup>{evento.ubicacion.nombre}</Popup>
                </Marker>
              </MapContainer>
            </div>
            <p className="mt-2 text-gray-600">
              {evento.ubicacion.descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};