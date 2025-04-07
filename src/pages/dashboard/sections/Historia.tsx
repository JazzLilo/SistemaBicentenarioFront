import { EventHistorico } from "@/components/interface";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom"; 
import { useAtom } from "jotai";
import { eventohistoricoAtom } from "@/context/context";

function Historia() {
    const [eventos, setEventos] = useState<EventHistorico[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [, setEvento] = useAtom(eventohistoricoAtom);

    const fetchEventos = async () => {
        setLoading(true);
        try {
            const response : any = await apiService.get("eventos_historicos");
            setEventos(response.data);
        } catch (error) {
            console.error("Error fetching eventos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "PPP", { locale: es });
    };

    const handleVerMasClick = (evento: EventHistorico) => {
        setEvento(evento);
        navigate(`/eventos`);
    };

    return (
        <div className="container mx-auto px-4 py-8">   
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    200 Años de Historia
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                    Hitos históricos de Bolivia desde su independencia
                </p>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mt-2" />
                                <Skeleton className="h-4 w-5/6 mt-2" />
                                <Skeleton className="h-4 w-4/6 mt-2" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-24" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventos.map((evento) => (
                        <Card key={evento.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-xl">{evento.nombre}</CardTitle>
                                <CardDescription className="flex flex-col gap-1">
                                    <span className="font-medium">
                                        {formatDate(evento.fecha_inicio)}
                                        {evento.fecha_fin && ` - ${formatDate(evento.fecha_fin)}`}
                                    </span>
                                    {evento.ubicacion && (
                                        <span className="text-sm">{evento.ubicacion.nombre}</span>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {evento.descripcion}
                                </p>
                                {evento.tipo && (
                                    <div className="mt-4">
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            {evento.tipo}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    className="w-full mt-4"
                                    onClick={() => handleVerMasClick(evento)}
                                >
                                    Ver Más
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Historia;