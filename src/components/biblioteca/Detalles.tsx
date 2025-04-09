import { useAtom } from 'jotai'
import { bibliotecaAtom } from '@/context/context'
import { Button } from "@/components/ui/button";

export const Detalles = () => {
  const [biblioteca] = useAtom(bibliotecaAtom)

  if (!biblioteca) return <div className="p-4 text-gray-500">Selecciona un libro de la lista</div>

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda - Portada e información básica */}
        <div className="space-y-4">
          <img
            src={biblioteca.imagen}
            alt={`Portada de ${biblioteca.titulo}`}
            className="w-full h-96 object-contain rounded-lg shadow-md"
          />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {biblioteca.titulo}
            </h2>
            <p className="text-xl text-gray-600">{biblioteca.autor}</p>
          </div>
        </div>

        {/* Columna derecha - Detalles del libro */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Información del Libro</h3>
            
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Fecha de publicación:</span>
                  <p>{biblioteca.fecha_publicacion}</p>
                </div>
                <div>
                  <span className="font-medium">Edición:</span>
                  <p>{biblioteca.edicion}</p>
                </div>
              </div>
              <br/>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Fuente:</span>
                  <p>{biblioteca.fuente}</p>
                </div>
                <div>
                  <span className="font-medium">Categoría:</span>
                  <p>{biblioteca.tipo.tipo}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Acceso al documento</h3>
            <div className="flex flex-col space-y-2">
              {biblioteca.enlace && (
                <Button asChild variant="outline">
                  <a 
                    href={biblioteca.enlace} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Ver documento PDF
                  </a>
                </Button>
              )}
              {biblioteca.id_tipo && (
                <p className="text-sm text-gray-500">
                  ID de categoría: {biblioteca.id_tipo}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Metadatos</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>ID del libro: {biblioteca.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}