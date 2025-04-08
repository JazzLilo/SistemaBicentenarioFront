import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { eventohistoricoAtom } from "@/context/context";
import { MapaInteractivo } from "../map/Mapainteractivo";
import { EventHistorico, Categoria } from "@/components/interface";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";

export interface EventHistoricoFormProps {
  mode?: "create" | "edit";
  onSubmit: (data: EventHistorico) => void;
}

export const EventHistoricoForm = ({
  mode,
  onSubmit,
}: EventHistoricoFormProps) => {
  const [eventAtom] = useAtom(eventohistoricoAtom);
  const isEdit = mode === "edit" || (eventAtom && eventAtom.id);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipo, setTipo] = useState("");

  const [ubicacionInfo, setUbicacionInfo] = useState({
    id: 0,
    nombre: "",
    latitud: -19.6133,
    longitud: -65.7533,
    imagen: "",
    descripcion: "",
  });

  const [showMap, setShowMap] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [, setFechaInicioDisplay] = useState("");
  const [, setFechaFinDisplay] = useState("");
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  useEffect(() => {
    setFechaInicioDisplay(formatDateForInput(fechaInicio));
    setFechaFinDisplay(formatDateForInput(fechaFin));
  }, [fechaInicio, fechaFin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await apiService.get("categorias/?skip=0&limit=100");
        setCategorias(res.data);

        if (isEdit && eventAtom) {
          setNombre(eventAtom.nombre);
          setDescripcion(eventAtom.descripcion);
          setFechaInicio(eventAtom.fecha_inicio);
          setFechaFin(eventAtom.fecha_fin);
          setTipo(eventAtom.tipo);
          if (eventAtom.ubicacion) {
            setUbicacionInfo({ ...eventAtom.ubicacion });
          }
          console.log("Tipo", tipo)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingCategorias(false);
      }
    };

    fetchData();
  }, [isEdit]);

  const findCategoriaByNombre = (nombre: string) => {
    return categorias.find(c =>
      c.nombre_categoria.toLowerCase() === nombre?.toLowerCase()
    );
  };

  const renderSelectCategoria = () => {
    if (loadingCategorias) {
      return <div>Cargando categorías...</div>;
    }

    const categoriaSeleccionada = findCategoriaByNombre(tipo);

    return (
      <Select
        value={categoriaSeleccionada?.id.toString() || ""}
        onValueChange={(id) => {
          const selectedCat = categorias.find(c => c.id.toString() === id);
          setTipo(selectedCat?.nombre_categoria || "");
        }}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una categoría">
            {categoriaSeleccionada?.nombre_categoria || "Selecciona una categoría"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categorias.map((categoria) => (
            <SelectItem
              key={categoria.id}
              value={categoria.id.toString()}
            >
              {categoria.nombre_categoria}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return '';
    return isoDate.split('T')[0];
  };

  const formatInputToISO = (inputDate: string) => {
    if (!inputDate) return '';
    return `${inputDate}T00:00:00Z`;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapaChange = (newPos: { lat: number; lng: number }) => {
    setUbicacionInfo((prev) => ({
      ...prev,
      latitud: newPos.lat,
      longitud: newPos.lng,
    }));
  };


  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `${nombre}-${Date.now()}`);
    formData.append('tipo', 'evento_h');

    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imagenUrl = ubicacionInfo.imagen;

      if (imageFile) {
        imagenUrl = await uploadImage(imageFile);
      }

      const ubicacionActualizada = {
        ...ubicacionInfo,
        imagen: imagenUrl
      };

      const eventData: EventHistorico = {
        id: isEdit && eventAtom ? eventAtom.id : Date.now(),
        nombre,
        descripcion,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        tipo,
        id_ubicacion: ubicacionInfo.id,
        ubicacion: ubicacionActualizada,
      };

      onSubmit(eventData);

    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEdit ? "Editar Evento Histórico" : "Crear Evento Histórico"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Descripción</Label>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha Inicio</Label>
              <Input
                type="date"
                value={formatDateForInput(fechaInicio)}
                onChange={(e) => setFechaInicio(formatInputToISO(e.target.value))}
                required
              />
            </div>
            <div>
              <Label>Fecha Fin</Label>
              <Input
                type="date"
                value={formatDateForInput(fechaFin)}
                onChange={(e) => setFechaFin(formatInputToISO(e.target.value))}
                required
              />
            </div>
          </div>
          <div>
            <Label>Tipo</Label>
            {renderSelectCategoria()}
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">Ubicación</Label>
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowMap((prev) => !prev)}
            >
              {showMap ? "Ocultar mapa" : "Editar ubicación en mapa"}
            </Button>

            {showMap && (
              <div className="h-[300px] overflow-y-auto border rounded-md mt-2">
                <MapaInteractivo
                  initialPosition={{
                    lat: ubicacionInfo.latitud,
                    lng: ubicacionInfo.longitud,
                  }}
                  onChange={handleMapaChange}
                />
              </div>
            )}

            <div className="mt-4 grid gap-3">
              <p className="text-sm text-muted-foreground">
                Latitud: {ubicacionInfo.latitud.toFixed(5)} | Longitud:{" "}
                {ubicacionInfo.longitud.toFixed(5)}
              </p>
              <div>
                <Label>Nombre de la ubicación</Label>
                <Input
                  value={ubicacionInfo.nombre}
                  onChange={(e) =>
                    setUbicacionInfo((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Descripción de la ubicación</Label>
                <Textarea
                  value={ubicacionInfo.descripcion}
                  onChange={(e) =>
                    setUbicacionInfo((prev) => ({
                      ...prev,
                      descripcion: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Imagen</Label>

                {/* Mostrar vista previa si existe */}
                {(imagePreview || ubicacionInfo.imagen) && (
                  <div className="mb-4">
                    <img
                      src={imagePreview || ubicacionInfo.imagen}
                      alt="Vista previa"
                      className="h-40 object-cover rounded-md border"
                    />
                  </div>
                )}

                {/* Opción 1: Subir archivo */}
                <div className="mb-4">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" type="button" asChild>
                      <span>Seleccionar archivo</span>
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Label>
                  {imageFile && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {imageFile.name}
                    </span>
                  )}
                </div>

                {/* Opción 2: Ingresar URL */}
                <div>
                  <Label>O ingresar URL de imagen</Label>
                  <Input
                    value={ubicacionInfo.imagen}
                    onChange={(e) =>
                      setUbicacionInfo((prev) => ({
                        ...prev,
                        imagen: e.target.value,
                      }))
                    }
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            {isEdit ? "Guardar Cambios" : "Crear Evento"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
