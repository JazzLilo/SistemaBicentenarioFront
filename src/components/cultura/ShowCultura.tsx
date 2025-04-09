import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { culturaAtom } from '@/context/context';
import { MapaVisualizacion } from '../map/MapaView';
import { apiService } from '@/services/apiService';
import { Cultura } from '../interface';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";

export interface IMultimedia {
  url: string;
  tipo: 'arte' | 'musica' | 'Literatura' | 'video';
  id_cultura: number;
  id: number;
}

export const ShowCultura = () => {
  const [cultura] = useAtom(culturaAtom);
  const [multimedia, setMultimedia] = React.useState<IMultimedia[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cultura?.id) {
      fetchMultimedia(cultura.id);
    }
  }, [cultura]);

  console.log("Cultura:", multimedia);
  const fetchMultimedia = async (id: number) => {
    try {
      const response: any = await apiService.get(`multimedia/cultura/${id}`);
      setMultimedia(response.data);
    } catch (err) {
      console.error("Error fetching multimedia:", err);
    }
  };

  if (!cultura) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold">No se ha seleccionado ninguna cultura</h2>
          <p className="text-muted-foreground">Por favor, selecciona una cultura para ver sus detalles</p>
        </div>
      </div>
    );
  }

  // Dividir la descripción en partes
  const [tradiciones, costumbres, lenguas] = cultura.descripcion.split(' - ');

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{cultura.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">🎉 Tradiciones</h3>
                <p className="text-gray-600">{tradiciones || "No disponible"}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">👥 Costumbres</h3>
                <p className="text-gray-600">{lenguas || "No disponible"}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">💬 Lenguas</h3>
                <p className="text-gray-600">{costumbres || "No disponible"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación */}
          {cultura.ubicacion && (
            <Card>
              <CardHeader>
                <CardTitle>Ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">{cultura.ubicacion.nombre}</h3>
                <p className="text-muted-foreground mb-4">{cultura.ubicacion.descripcion}</p>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapaVisualizacion position={{
                    lat: cultura.ubicacion.latitud,
                    lng: cultura.ubicacion.longitud
                  }} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Multimedia y info adicional */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Galería Multimedia</CardTitle>
            </CardHeader>
            <CardContent>
              {multimedia.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {multimedia.map((item) => (
                      <CarouselItem key={item.id}>
                        {item.tipo === 'arte' ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img
                              src={item.url}
                              alt={`Obra de arte ${item.id}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                              🎨 Obra Artística
                            </div>
                          </div>
                        ) : item.tipo === 'Literatura' ? (
                          <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-4">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <div>
                                <p className="font-medium">Documento Literario</p>
                                <p className="text-sm">Haz clic para ver el PDF</p>
                              </div>
                            </a>
                          </div>
                        ) : (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <ReactPlayer
                              url={item.url}
                              width="100%"
                              height="100%"
                              controls
                              className="absolute top-0 left-0"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                              {item.tipo === 'musica' ? '🎵 Música' : '🎥 Video'}
                            </div>
                          </div>
                        )}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {multimedia.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No hay multimedia disponible
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <h4 className="font-medium">Ubicación</h4>
                <p className="text-muted-foreground">{cultura.ubicacion.nombre}</p>
              </div>
              <div>
                <h4 className="font-medium">Coordenadas</h4>
                <p className="text-muted-foreground">
                  {cultura.ubicacion.latitud}, {cultura.ubicacion.longitud}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};