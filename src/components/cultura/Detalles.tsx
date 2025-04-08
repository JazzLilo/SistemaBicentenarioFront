
import { useAtom } from 'jotai'
import { culturaAtom } from '@/context/context'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const Detalles = () => {
  const [cultura] = useAtom(culturaAtom)
  console.log(cultura)
  if (!cultura) return <div className="p-4 text-gray-500">Selecciona una cultura</div>

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda - Imagen e información básica */}
        <div className="space-y-4">
          <img
            src={cultura.imagen}
            alt={`${cultura.nombre}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {cultura.nombre}
            </h2>

          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Descripcion</h3>
            <p className="text-gray-600 leading-relaxed">
              {cultura.descripcion}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-lg">Detalles de la Ubicación</h3>
              <div className="mt-2 h-48 rounded-lg overflow-hidden">
                <MapContainer
                  center={[cultura.ubicacion.latitud, cultura.ubicacion.longitud]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[cultura.ubicacion.latitud, cultura.ubicacion.longitud]}
                  >
                    <Popup>
                      <span>{cultura.ubicacion.nombre}</span>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}