import { apiService } from "@/services/apiService";
import { useEffect, useState, useRef } from "react";
import { EventHistorico } from "@/components/interface";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { eventohistoricoAtom } from "@/context/context";

export function TimeLine() {
  const navigate = useNavigate();
  const [historias, setHistorias] = useState<EventHistorico[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventHistorico | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [, setEvento] = useAtom(eventohistoricoAtom);
  const fetchHistorias = async () => {
    try {
      const response :any = await apiService.get('eventos_historicos/?skip=0&limit=100');
      const sortedHistorias = response.data.sort((a: EventHistorico, b: EventHistorico) =>
        new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime()
      );
      setHistorias(sortedHistorias);
      if (sortedHistorias.length > 0) {
        setActiveEvent(sortedHistorias[0]);
      }
    } catch (error) {
      console.error("Error fetching historias:", error);
    }
  };

  useEffect(() => {
    fetchHistorias();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && historias.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % historias.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, historias.length]);

  useEffect(() => {
    if (historias.length > 0) {
      setActiveEvent(historias[currentIndex]);
      scrollToEvent(currentIndex);
    }
  }, [currentIndex, historias]);

  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const scrollToEvent = (index: number) => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const items = container.querySelectorAll('.timeline-item');
      if (items[index]) {
        const item = items[index] as HTMLElement;
        const containerWidth = container.offsetWidth;
        const itemOffset = item.offsetLeft;
        const itemWidth = item.offsetWidth;

        container.scrollTo({
          left: itemOffset - containerWidth / 2 + itemWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleEventClick = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const handleVerMasClick = (evento: EventHistorico) => {
    setEvento(evento);
    navigate(`/eventos`);
  };

  const chunkSize = 10; // Mostrar 10 eventos a la vez
  const [visibleChunk, setVisibleChunk] = useState(0);
  const totalChunks = Math.ceil(historias.length / chunkSize);

  const visibleEvents = historias.slice(
    visibleChunk * chunkSize,
    (visibleChunk + 1) * chunkSize
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Eventos Históricos</h1>
        <p className="mt-2 text-xl">Explora nuestra línea de tiempo interactiva</p>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-2 rounded-md transition ${autoPlay ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              {autoPlay ? 'Detener' : 'Autoplay'}
            </button>
          </div>
        </div>

          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setVisibleChunk(prev => Math.max(0, prev - 1));
                  setAutoPlay(false);
                }}
                disabled={visibleChunk === 0}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-600">
                Mostrando {visibleChunk * chunkSize + 1}-{Math.min((visibleChunk + 1) * chunkSize, historias.length)} de {historias.length} eventos
              </span>
              <button
                onClick={() => {
                  setVisibleChunk(prev => Math.min(totalChunks - 1, prev + 1));
                  setAutoPlay(false);
                }}
                disabled={visibleChunk === totalChunks - 1}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>

            <div
              ref={timelineRef}
              className="relative py-8 overflow-x-auto scrollbar-hide"
            >
              <div className="absolute left-0 right-0 h-1 bg-blue-300 top-1/2 transform -translate-y-1/2"></div>

              <div className="relative flex" style={{ minWidth: `${visibleEvents.length * 100}px` }}>
                {visibleEvents.map((historia, index) => {
                  const globalIndex = visibleChunk * chunkSize + index;
                  return (
                    <motion.div
                      key={historia.id}
                      className="timeline-item relative flex flex-col items-center px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full cursor-pointer z-10 transition-all duration-300 ${activeEvent?.id === historia.id
                            ? 'bg-blue-600 scale-125 shadow-lg'
                            : 'bg-blue-400 hover:bg-blue-500 hover:scale-110'
                          }`}
                        onClick={() => handleEventClick(globalIndex)}
                        onMouseEnter={() => setActiveEvent(historia)}
                        onMouseLeave={() => setActiveEvent(historias[currentIndex])}
                      />
                      <span className="mt-2 font-medium text-gray-700">
                        {getYear(historia.fecha_inicio)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {activeEvent && (
                <motion.div
                  className="w-full max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                      {activeEvent.ubicacion?.imagen && (
                        <div className="md:w-1/3">
                          <img
                            className="w-full h-48 object-cover"
                            src={activeEvent.ubicacion.imagen}
                            alt={activeEvent.nombre}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-historia.jpg';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                              {activeEvent.tipo}
                            </div>
                            <h2 className="mt-2 text-2xl font-semibold text-gray-800">
                              {activeEvent.nombre}
                            </h2>
                          </div>
                          <span className="text-sm text-gray-500">
                            {currentIndex + 1}/{historias.length}
                          </span>
                        </div>
                        <p className="mt-3 text-gray-500">
                          {activeEvent.descripcion}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-600">Fecha Inicio:</span>
                            <p className="text-sm text-gray-500">
                              {new Date(activeEvent.fecha_inicio).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Fecha Fin:</span>
                            <p className="text-sm text-gray-500">
                              {activeEvent.fecha_fin ? new Date(activeEvent.fecha_fin).toLocaleDateString() : 'Presente'}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-sm font-medium text-gray-600">Ubicación:</span>
                            <p className="text-sm text-gray-500">
                              {activeEvent.ubicacion?.nombre || 'Desconocida'}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <Button
                              className="w-full mt-4"
                              onClick={() => handleVerMasClick(activeEvent)}
                            >
                              Ver Más
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controles de navegación */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentIndex(prev => (prev - 1 + historias.length) % historias.length);
                  setAutoPlay(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Anterior Evento
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(prev => (prev + 1) % historias.length);
                  setAutoPlay(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Siguiente Evento
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

