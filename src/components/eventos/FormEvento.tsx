// FormEvento.tsx
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { eventoAtom } from "@/context/context";
import { Evento,  User } from "@/components/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapaInteractivo } from "../map/Mapainteractivo";
import { Textarea } from "@/components/ui/textarea";


export interface FormEventoProps {
  mode?: "create" | "edit";
  onSubmit: (data: Evento) => void;
}

export const FormEvento = ({ mode, onSubmit }: FormEventoProps) => {
  const [eventoAtomValue] = useAtom(eventoAtom);
  const isEdit = mode === "edit" || (eventoAtomValue && eventoAtomValue.id);

  // Estados principales
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [idUbicacion, setIdUbicacion] = useState<number | null>(null);
  const [idOrganizador, setIdOrganizador] = useState<number | null>(null);
  const [imagen, setImagen] = useState<string | null>(null);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const [organizadores, setOrganizadores] = useState<User[]>([]);
  const [, setLoading] = useState(true);

  const [categorias, setCategorias] = useState<string[]>([]);

  const [organizadorInfo, setOrganizadorInfo] = useState<User>({
    apellidoMaterno: "",
    apellidoPaterno: "",
    cantIntentos: 0,
    ciudad: "",
    correo: "",
    email_verified_at: "",
    estado: false,
    genero: "",
    id: 0,
    imagen: "",
    nombre: "",
    pais: "",
    telefono: "",
    ultimoIntentoFallido: "",
    roles: [],
  });

  const [agregandoCategoria, setAgregandoCategoria] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const [imagenUbicacionFile, setImagenUbicacionFile] = useState<File | null>(null);
  const [imagePreviewUbicacion, setImagePreviewUbicacion] = useState<string | null>(null);
  const [, setIsUploadingUbicacion] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [ubicacionInfo, setUbicacionInfo] = useState({
    id: 0,
    nombre: "",
    latitud: -19.6133,
    longitud: -65.7533,
    imagen: "",
    descripcion: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgRes: any = await apiService.get("users");

        // Filtrar usuarios con rol organizador
        const organizadoresFiltrados = orgRes.data.filter((user: User) =>
          user.roles?.includes('organizador')
        );

        setOrganizadores(organizadoresFiltrados);

        const catRes: any = await apiService.get("eventos-agendables/categoriasEve/1");
        setCategorias(catRes.data);

        if (isEdit && eventoAtomValue) {
          console.log("eventoAtomValue", eventoAtomValue)
          setNombre(eventoAtomValue.nombre);
          setCategoria(eventoAtomValue.categoria);
          setEstado(eventoAtomValue.estado);
          setDescripcion(eventoAtomValue.descripcion);
          setFechaHora(eventoAtomValue.fecha_hora);
          setIdUbicacion(eventoAtomValue.id_ubicacion);
          setIdOrganizador(eventoAtomValue.id_organizador);
          setImagen(eventoAtomValue.imagen);
          setImagenPreview(eventoAtomValue.imagen || null);
          setUbicacionInfo({
            id: eventoAtomValue.ubicacion.id,
            nombre: eventoAtomValue.ubicacion.nombre,
            latitud: eventoAtomValue.ubicacion.latitud,
            longitud: eventoAtomValue.ubicacion.longitud,
            imagen: eventoAtomValue.ubicacion.imagen,
            descripcion: eventoAtomValue.ubicacion.descripcion,
          });
          setOrganizadorInfo(eventoAtomValue.organizador)
          setImagePreviewUbicacion(eventoAtomValue.ubicacion.imagen);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEdit, eventoAtomValue]);

  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return '';
    
    if (isoDate.includes('T') && isoDate.includes(':')) {
      return isoDate.slice(0, 16); 
    }
    
    return `${isoDate.split('T')[0]}T00:00`;
  };
  
  const formatInputToISO = (inputDate: string) => {
    if (!inputDate) return '';
    
    if (!inputDate.includes('T')) {
      return `${inputDate}T00:00:00Z`;
    }
    
    const parts = inputDate.split('T');
    if (parts[1].split(':').length === 2) {
      return `${inputDate}:00Z`;
    }
    
    return inputDate.endsWith('Z') ? inputDate : `${inputDate}Z`;
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `evento-${nombre}-${Date.now()}`);
    formData.append('tipo', 'evento_Agendable');

    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  };

  const handleAgregarCategoria = () => {
    if (nuevaCategoria.trim()) {
      if (!categorias.includes(nuevaCategoria)) {
        setCategorias([...categorias, nuevaCategoria]);
      }
      setCategoria(nuevaCategoria);
      setAgregandoCategoria(false);
      setNuevaCategoria("");
    }
  };

  const handleMapaChange = (newPos: { lat: number; lng: number }) => {

    setUbicacionInfo((prev) => ({
      ...prev,
      latitud: newPos.lat,
      longitud: newPos.lng,
    }));
  };

  const handleImagenUbicacionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploadingUbicacion(true);

    const file = e.target.files?.[0];
    if (file) {
      setImagenUbicacionFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUbicacion(reader.result as string);
      reader.readAsDataURL(file);
    }


  };

  const renderSelectCategoria = () => {
    const [editando, setEditando] = useState(false);
  
    return (
      <div className="">
        
        {!editando ? (
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 border rounded-md text-sm flex-1">
              {categoria || "No se ha seleccionado una categoría"}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditando(true)}
            >
              Editar
            </Button>
          </div>
        ) : (
          <div className="">
            <Select
              value={categoria || ''}
              onValueChange={(value) => {
                setCategoria(value);
                setEditando(false);
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const uploadUbicacionImage = async (file: File): Promise<string> => {
    console.log("send")
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `ubicacion-${nombre}-${Date.now()}`);
    formData.append('tipo', 'ubicacion');

    setIsUploadingUbicacion(true);

    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let ubicacionImageUrl = ubicacionInfo.imagen;
    let imagenUrl = imagen;

    try {
      if (imagenFile) {
        imagenUrl = await handleImageUpload(imagenFile);
      }

      if (imagenUbicacionFile) {
        ubicacionImageUrl = await uploadUbicacionImage(imagenUbicacionFile);
      }

      const eventoData: Evento = {
        id: isEdit && eventoAtomValue ? eventoAtomValue.id : Date.now(),
        nombre,
        categoria,
        estado,
        descripcion,
        fecha_hora: fechaHora,
        id_ubicacion: idUbicacion!,
        id_organizador: idOrganizador!,
        imagen: imagenUrl || "",
        ubicacion: {
          ...ubicacionInfo,
          imagen: ubicacionImageUrl
        },
        organizador: {
          ...organizadorInfo // Corregido el operador spread
        }
      };

      onSubmit(eventoData);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            {isEdit ? "Editar Evento" : "Crear Nuevo Evento"}
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nombre del Evento *</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Festival Cultural"
            />
          </div>

          {mode === "create" && (
            <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>Organizador *</Label>
              <Select
                value={idOrganizador?.toString() || ""}
                onValueChange={(value) => setIdOrganizador(Number(value))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un organizador" />
                </SelectTrigger>
                <SelectContent>
                  {organizadores.map((organizador) => (
                    <SelectItem
                      key={organizador.id}
                      value={organizador.id.toString()}
                    >
                      {`${organizador.nombre} ${organizador.apellidoPaterno}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          )}
            
          

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Categoría *</Label>
              {!agregandoCategoria ? (
                <div className="flex gap-2 mt-1">
                  {renderSelectCategoria()}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAgregandoCategoria(true)}
                    className="whitespace-nowrap"
                  >
                    + Nueva
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 mt-1">
                  <Input
                    autoFocus
                    placeholder="Ej: Festival de Cine"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAgregarCategoria()}
                  />
                  <Button
                    type="button"
                    onClick={handleAgregarCategoria}
                  >
                    Guardar
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha y Hora *</Label>
              <Input
                type="datetime-local"
                value={formatDateForInput(fechaHora)}
                onChange={(e) => setFechaHora(formatInputToISO(e.target.value))}
                required
              />
            </div>

            <div>
              <Label>Estado *</Label>
              <Select
                value={estado}
                onValueChange={setEstado}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Descripción *</Label>
            <Input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              placeholder="Descripción detallada del evento"
            />
          </div>

          <div>
            <Label>Imagen del Evento</Label>
            <div className="mb-4">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <Button variant="outline" type="button" asChild>
                  <span>Subir imagen</span>
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImagenFile(e.target.files[0]);
                      setImagenPreview(URL.createObjectURL(e.target.files[0]));
                      setImagen("");
                    }
                  }}
                  className="hidden"
                />
              </Label>
              {imagenFile && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {imagenFile.name}
                </span>
              )}
            </div>

            {imagenPreview && (
              <div className="mb-4">
                <img
                  src={imagenPreview}
                  alt="Vista previa de imagen"
                  className="h-40 object-contain rounded-md border"
                />
              </div>
            )}

            <Input
              value={imagen || ""}
              onChange={(e) => {
                setImagen(e.target.value);
                setImagenFile(null);
                setImagenPreview(null);
              }}
              placeholder="Ingresa URL de la imagen"
              disabled={!!imagenFile}
            />
          </div>

          <div className="space-y-2">
            <Label>Ubicación</Label>
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
                <Label>Imagen de la ubicación</Label>
                {(imagePreviewUbicacion || ubicacionInfo.imagen) && (
                  <div className="mb-4">
                    <img
                      src={imagePreviewUbicacion || ubicacionInfo.imagen}
                      alt="Vista previa"
                      className="h-40 object-cover rounded-md border"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <Label htmlFor="file-upload-ubicacion" className="cursor-pointer">
                    <Button variant="outline" type="button" asChild>
                      <span>Seleccionar archivo</span>
                    </Button>
                    <input
                      id="file-upload-ubicacion"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImagenUbicacionUpload(e);
                      }
                      }
                      className="hidden"
                    />
                  </Label>
                  {imagenUbicacionFile && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {imagenUbicacionFile.name}
                    </span>
                  )}
                </div>
                <div>
                  <Label>O ingresar URL de imagen</Label>
                  <Input
                    id="file-upload-ubicacion-url"
                    value={ubicacionInfo.imagen}
                    onChange={(e) => {
                      setImagenUbicacionFile(null);
                      setImagePreviewUbicacion(null);
                      setUbicacionInfo((prev) => ({
                        ...prev,
                        imagen: e.target.value,
                      }))
                    }
                    }
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
            </div>

          </div>

          <Button type="submit" className="w-full mt-4">
            {isEdit ? "Actualizar Evento" : "Crear Evento"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};