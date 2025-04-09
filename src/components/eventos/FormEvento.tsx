// FormEvento.tsx
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { eventoAtom } from "@/context/context";
import { Evento, Ubicacion, User } from "@/components/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  // Estados para datos relacionados
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
  const [organizadores, setOrganizadores] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar datos necesarios
        const [ubiRes, orgRes] = await Promise.all([
          apiService.get("/api/v1/ubicaciones"),
          apiService.get("/api/v1/usuarios")
        ]);

        setUbicaciones(ubiRes.data);
        setOrganizadores(orgRes.data);

        // Si es edición, cargar datos del evento
        if (isEdit && eventoAtomValue) {
          setNombre(eventoAtomValue.nombre);
          setCategoria(eventoAtomValue.categoria);
          setEstado(eventoAtomValue.estado);
          setDescripcion(eventoAtomValue.descripcion);
          setFechaHora(eventoAtomValue.fecha_hora);
          setIdUbicacion(eventoAtomValue.id_ubicacion);
          setIdOrganizador(eventoAtomValue.id_organizador);
          setImagen(eventoAtomValue.imagen);
          setImagenPreview(eventoAtomValue.imagen || null);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEdit, eventoAtomValue]);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `evento-${nombre}-${Date.now()}`);
    formData.append('tipo', 'evento');

    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imagenUrl = imagen;
    
    try {
      if (imagenFile) {
        imagenUrl = await handleImageUpload(imagenFile);
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
        ubicacion: ubicaciones.find(u => u.id === idUbicacion)!,
        organizador: organizadores.find(o => o.id === idOrganizador)!
      };

      onSubmit(eventoData);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  if (loading) return <div>Cargando...</div>;

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Ubicación *</Label>
              <Select
                value={idUbicacion?.toString() || ""}
                onValueChange={(value) => setIdUbicacion(Number(value))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {ubicaciones.map((ubicacion) => (
                    <SelectItem
                      key={ubicacion.id}
                      value={ubicacion.id.toString()}
                    >
                      {ubicacion.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha y Hora *</Label>
              <Input
                type="datetime-local"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
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

          <Button type="submit" className="w-full mt-4">
            {isEdit ? "Actualizar Evento" : "Crear Evento"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};