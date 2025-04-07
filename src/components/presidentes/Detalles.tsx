import React from 'react'
import { useAtom } from 'jotai'
import { presidenteAtom } from '@/context/context'

export const Detalles = () => {
  const [presidente] = useAtom(presidenteAtom)

  if (!presidente) return <div className="p-4 text-gray-500">Selecciona un presidente</div>

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda - Imagen e información básica */}
        <div className="space-y-4">
          <img 
            src={presidente.imagen} 
            alt={`${presidente.nombre} ${presidente.apellido}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {presidente.nombre} {presidente.apellido}
            </h2>
            
            <p className="text-lg text-gray-600">
              {presidente.partido_politico}
            </p>
            
            <div className="flex gap-2 text-sm text-gray-500">
              <p>Periodo: </p>
              <p>
                {new Date(presidente.periodo_inicio).toLocaleDateString()} - 
                {presidente.periodo_fin ? 
                  ` ${new Date(presidente.periodo_fin).toLocaleDateString()}` : 
                  ' Actualidad'}
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha - Detalles */}
        <div className="space-y-6">
          {/* Biografía */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Biografía</h3>
            <p className="text-gray-600 leading-relaxed">
              {presidente.biografia}
            </p>
          </div>

          {/* Políticas clave */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Políticas clave</h3>
            <div className="flex flex-wrap gap-2">
              {presidente.politicas_clave.split(',').map((politica, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {politica.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Partido político</p>
              <p className="font-medium text-gray-700">{presidente.partido_politico}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">ID de registro</p>
              <p className="font-medium text-gray-700">#{presidente.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}