import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { apiService } from '@/services/apiService'
import { EventHistorico } from '@/components/interface'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { eventohistoricoAtom } from "@/context/context";

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const defaultCenter = { lat: -19.6133, lng: -65.7533 }

function MapViewAdjuster({ points }: { points: { lat: number; lng: number }[] }) {
  const map = useMap()

  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points)
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      map.setView(defaultCenter, 13)
    }
  }, [points, map])

  return null
}


export const MapaHistorico = () => {
  const [historias, setHistorias] = useState<EventHistorico[]>([])
  const [selectedHistoria, setSelectedHistoria] = useState<EventHistorico | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const navigate = useNavigate();
  const [, setEvento] = useAtom(eventohistoricoAtom);
  const handleVerMasClick = (evento: EventHistorico) => {
    setEvento(evento);
    navigate(`/eventos`);
};
  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response: any = await apiService.get('eventos_historicos/?skip=0&limit=100')
        setHistorias(response.data)
      } catch (error) {
        console.error('Error fetching historias:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistorias()
  }, [])

  const filteredHistorias = categoryFilter
    ? historias.filter(historia => historia.tipo === categoryFilter)
    : historias

  const mapPoints = filteredHistorias.map(historia => ({
    lat: historia.ubicacion.latitud,
    lng: historia.ubicacion.longitud,
    historia
  }))

  const categories = [...new Set(historias.map(h => h.tipo))]

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">

      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mapa Histórico</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setCategoryFilter('')
              setSelectedHistoria(null)
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 border-b">
          <div className="max-w-4xl mx-auto">
            <label className="block text-sm font-medium mb-2">Filtrar por categoría:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">

        <div className="flex-1 h-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Cargando mapa...</p>
            </div>
          ) : (
            <MapContainer
              center={defaultCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapViewAdjuster points={mapPoints.map(p => ({ lat: p.lat, lng: p.lng }))} />

              {mapPoints.map((point) => (
                <Marker
                  key={point.historia.id}
                  position={[point.lat, point.lng]}
                  eventHandlers={{
                    click: () => setSelectedHistoria(point.historia)
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-bold">{point.historia.nombre}</h3>
                      <p className="text-sm">{point.historia.tipo}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {selectedHistoria && (
          <div className="w-96 border-l overflow-y-auto">
            <Card className="border-0 rounded-none h-full">
              <CardHeader>
                <CardTitle>{selectedHistoria.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">

                  <div>
                    <h4 className="font-semibold">Descripción:</h4>
                    <p>{selectedHistoria.descripcion}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Fecha Inicio:</h4>
                      <p>{new Date(selectedHistoria.fecha_inicio).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Fecha Fin:</h4>
                      <p>{selectedHistoria.fecha_fin ? new Date(selectedHistoria.fecha_fin).toLocaleDateString() : 'Presente'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold">Ubicación:</h4>
                    <p>{selectedHistoria.ubicacion.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Lat: {selectedHistoria.ubicacion.latitud.toFixed(4)}, Lng: {selectedHistoria.ubicacion.longitud.toFixed(4)}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Categoría:</h4>
                    <p>{selectedHistoria.tipo}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => handleVerMasClick(selectedHistoria)}
                  >
                    Ver Mas
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setSelectedHistoria(null)}
                  >
                    Cerrar detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}