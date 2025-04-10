import { useState, useEffect } from "react"
import { apiService } from "@/services/apiService"
import { Evento } from "@/components/interface"
import { MapaVisualizacion } from "@/components/map/MapaView"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarView } from "./CalendarView"

export function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null)

  useEffect(() => {
    fetchEventos()
  }, [])

  const fetchEventos = async () => {
    try {
      const response:any = await apiService.get('eventos-agendables/?skip=0&limit=100')
      setEventos(response.data)
    } catch (error) {
      console.error("Error fetching eventos:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "PPPPp", { locale: es })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Agenda de Eventos Culturales</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          El calendario boliviano está marcado por coloridas celebraciones ancestrales
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* View Toggle */}
        <div className="flex justify-end mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Vista de Lista
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${viewMode === 'calendar' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Calendario
            </button>
          </div>
        </div>

        {/* Event List */}
        {viewMode === 'list' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <div 
                key={evento.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedEvent(evento)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={evento.imagen || '/placeholder-event.jpg'} 
                    alt={evento.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{evento.nombre}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      evento.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {evento.estado}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{evento.descripcion}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(evento.fecha_hora)}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {evento.ubicacion?.nombre || 'Ubicación no especificada'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View (Placeholder) */}
        {viewMode === 'calendar' &&  <CalendarView eventos={eventos} />}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="h-64 w-full overflow-hidden">
                  <img 
                    src={selectedEvent.imagen || '/placeholder-event.jpg'} 
                    alt={selectedEvent.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedEvent.nombre}</h2>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        selectedEvent.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedEvent.estado}
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        {selectedEvent.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-700">
                      {format(new Date(selectedEvent.fecha_hora), "EEEE, d 'de' MMMM", { locale: es })}
                    </p>
                    <p className="text-gray-600">
                      {format(new Date(selectedEvent.fecha_hora), "h:mm a", { locale: es })}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Descripción</h3>
                    <p className="text-gray-600 whitespace-pre-line">{selectedEvent.descripcion}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Organizador</h3>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                        {selectedEvent.organizador?.imagen ? (
                          <img 
                            src={selectedEvent.organizador.imagen} 
                            alt={selectedEvent.organizador.nombre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {selectedEvent.organizador?.nombre || 'Organizador no especificado'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedEvent.organizador?.correo || ''}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Ubicación</h3>
                    <div className="h-64 rounded-lg overflow-hidden">
                      <MapaVisualizacion position={{
                        lat: selectedEvent.ubicacion?.latitud || -19.6133,
                        lng: selectedEvent.ubicacion?.longitud || -65.7533
                      }} />
                    </div>
                    <p className="mt-2 text-gray-600">
                      {selectedEvent.ubicacion?.nombre}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedEvent.ubicacion?.descripcion}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Reservar asistencia
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Eventos