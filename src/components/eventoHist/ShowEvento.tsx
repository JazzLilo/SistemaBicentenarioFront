import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { eventohistoricoAtom } from '@/context/context';
import { MapaVisualizacion } from '../map/MapaView';
import { apiService } from '@/services/apiService';
import { IMultimedia } from '../interface';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ShowEvento = () => {
  const [evento] = useAtom(eventohistoricoAtom);
  const [multimedia, setMultimedia] = React.useState<IMultimedia[]>([]);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP", { locale: es });
  };

  useEffect(() => {
    if (evento?.id) {
      fetchMultimedia(evento.id);
    }
  }, [evento]);

  const fetchMultimedia = async (id: number) => {
    try {
      const response:any = await apiService.get(`multimedia/evento_historico/${id}`);
      setMultimedia(response.data);
    } catch (err) {
      console.error("Error fetching multimedia:", err);
    }
  };

  if (!evento) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold">No se ha seleccionado ningún evento</h2>
          <p className="text-muted-foreground">Por favor, selecciona un evento histórico para ver sus detalles</p>
        </div>
      </div>
    );
  }

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
              <CardTitle className="text-3xl">{evento.nombre}</CardTitle>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="font-medium">
                  {formatDate(evento.fecha_inicio)}
                  {evento.fecha_fin && ` - ${formatDate(evento.fecha_fin)}`}
                </span>
                {evento.tipo && (
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {evento.tipo}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{evento.descripcion}</p>
            </CardContent>
          </Card>

          {/* Ubicación */}
          {evento.ubicacion && (
            <Card>
              <CardHeader>
                <CardTitle>Ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">{evento.ubicacion.nombre}</h3>
                <p className="text-muted-foreground mb-4">{evento.ubicacion.descripcion}</p>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapaVisualizacion position={{
                    lat: evento.ubicacion.latitud,
                    lng: evento.ubicacion.longitud
                  }} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Multimedia */}
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
                        {item.tipo === 'imagen' ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img
                              src={item.url}
                              alt={`Multimedia ${item.id}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src={item.url}
                              title={`Video ${item.id}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
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
                  No hay multimedia disponible para este evento
                </p>
              )}
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <h4 className="font-medium">Tipo de Evento</h4>
                <p className="text-muted-foreground">{evento.tipo || 'No especificado'}</p>
              </div>
              {evento.ubicacion && (
                <div>
                  <h4 className="font-medium">Ubicación</h4>
                  <p className="text-muted-foreground">{evento.ubicacion.nombre}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};