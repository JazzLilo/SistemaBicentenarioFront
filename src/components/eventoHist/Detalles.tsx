import { useAtom } from "jotai";
import { eventohistoricoAtom } from "@/context/context";

export const Detalles = () => {
  const [eventohistorico] = useAtom(eventohistoricoAtom);

  if (!eventohistorico) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Selecciona un evento histórico</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{eventohistorico.nombre}</h2>
      
      <div className="space-y-2">
        <p className="text-gray-600">{eventohistorico.descripcion}</p>
        
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-semibold">Fecha inicio:</span>
            <p>{new Date(eventohistorico.fecha_inicio).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="font-semibold">Fecha fin:</span>
            <p>{new Date(eventohistorico.fecha_fin).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Ubicación:</h3>
          <div className="flex items-center gap-4">
            {eventohistorico.ubicacion.imagen && (
              <img 
                src={eventohistorico.ubicacion.imagen} 
                alt={eventohistorico.ubicacion.nombre}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <div>
              <p className="font-medium">{eventohistorico.ubicacion.nombre}</p>
              <p className="text-sm text-gray-500">
                Coordenadas: {eventohistorico.ubicacion.latitud}, {eventohistorico.ubicacion.longitud}
              </p>
              <p className="text-sm mt-2">{eventohistorico.ubicacion.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};