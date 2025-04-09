import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Cultura} from "@/components/interface";
import { apiService } from '@/services/apiService';
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "@/routes/routes";
import { useAtom } from "jotai";
import { culturaAtom } from "@/context/context";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CulturalMap = () => {
    const [,setCulturaValueAtom] = useAtom(culturaAtom);
    const [culturas, setCulturas] = useState<Cultura[]>([]);
    const [selectedCultura, setSelectedCultura] = useState<Cultura | null>(null);
    const [filterRegion, ] = useState<string>('');
    const navigate = useNavigate();
    useEffect(() => {

        fetchCulturas();

    }, []);

    const fetchCulturas = async () => {
        await apiService.get('culturas/?skip=0&limit=100').
            then((response) => {
                const data = response.data as Cultura[];
                setCulturas(data);
            }
            ).catch((error) => {
                console.error("Error fetching culturas:", error);
            }
            );
    }

    const handleVerMasClick = (cultura: Cultura) => {
        setCulturaValueAtom(cultura);
        navigate(`${PublicRoutes.Cultura}`)
    }

    const filteredCulturas = culturas.filter(cultura =>
        cultura.ubicacion.nombre.toLowerCase().includes(filterRegion.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50"
        style={{
            marginTop: '-50px',
        }}>
            <header className="bg-blue-600 text-white py-6 px-4">
                <h1 className="text-3xl font-bold">Culturas de Bolivia</h1>
                <p className="mt-2">Explora nuestra riqueza cultural</p>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
            
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Mapa */}
                    <div className="h-96 rounded-lg overflow-hidden shadow-lg relative z-0">
                        <MapContainer
                            center={[-16.2902, -63.5887]}
                            zoom={5}
                            style={{ height: '100%', width: '100%' }}
                            className="z-0"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {filteredCulturas.map((cultura) => (
                                <Marker
                                    key={cultura.id}
                                    position={[cultura.ubicacion.latitud, cultura.ubicacion.longitud]}
                                    eventHandlers={{
                                        click: () => setSelectedCultura(cultura),
                                    }}
                                >
                                    <Popup className="z-0">
                                        <div className="p-2">
                                            <h3 className="font-bold">{cultura.nombre}</h3>
                                            <img
                                                src={cultura.imagen}
                                                alt={cultura.nombre}
                                                className="w-24 h-16 object-cover mt-2"
                                            />
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Listado de Culturas */}
                    <div className="space-y-4 overflow-y-auto max-h-[50vh]">
                        {filteredCulturas.map((cultura) => (
                            <div
                                key={cultura.id}
                                onClick={() => setSelectedCultura(cultura)}
                                className={`p-4 bg-white rounded-lg shadow-md cursor-pointer transition-all
                  ${selectedCultura?.id === cultura.id ? 'ring-2 ring-blue-500' : ''}`}
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={cultura.imagen}
                                        alt={cultura.nombre}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold">{cultura.nombre}</h3>
                                        <p className="text-gray-600 line-clamp-2">{cultura.descripcion}</p>
                                        <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                            <MapPinIcon/>
                                            <span>{cultura.ubicacion.nombre}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Dialog open={!!selectedCultura} onOpenChange={(open) => !open && setSelectedCultura(null)}>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        {selectedCultura && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">{selectedCultura.nombre}</DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <img
                                            src={selectedCultura.imagen}
                                            alt={selectedCultura.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">Ubicación</h3>
                                            <p className="text-gray-600 mt-1">{selectedCultura.ubicacion.descripcion}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">Descripción</h3>
                                            <p className="text-gray-600 mt-1 whitespace-pre-line">
                                                {selectedCultura.descripcion}
                                            </p>
                                        </div>

                                        <div>
                                            <Button
                                                onClick={() => handleVerMasClick(selectedCultura)}
                                            >
                                                Ver Más
                                            </Button>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <h3 className="font-semibold text-lg">Detalles de la Ubicación</h3>
                                            <div className="mt-2 h-48 rounded-lg overflow-hidden">
                                                <MapContainer
                                                    center={[selectedCultura.ubicacion.latitud, selectedCultura.ubicacion.longitud]}
                                                    zoom={15}
                                                    style={{ height: '100%', width: '100%' }}
                                                    scrollWheelZoom={false}
                                                >
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker
                                                        position={[selectedCultura.ubicacion.latitud, selectedCultura.ubicacion.longitud]}
                                                    >
                                                        <Popup>
                                                            <span>{selectedCultura.ubicacion.nombre}</span>
                                                        </Popup>
                                                    </Marker>
                                                </MapContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export default CulturalMap;