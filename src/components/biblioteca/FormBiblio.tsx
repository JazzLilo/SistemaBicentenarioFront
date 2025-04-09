// FormBiblioteca.tsx
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { bibliotecaAtom } from "@/context/context";
import { Biblioteca } from "@/components/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface FormBiblioProps {
  mode?: "create" | "edit";
  onSubmit: (data: Biblioteca) => void;
}

interface TipoDocumento {
  id_tipo: number;
  tipo: string;
}

export const FormBiblio = ({ mode, onSubmit }: FormBiblioProps) => {
  const [bibliotecaAtomValue] = useAtom(bibliotecaAtom);
  const isEdit = mode === "edit" || (bibliotecaAtomValue && bibliotecaAtomValue.id);

  // Estados principales
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [imagen, setImagen] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [edicion, setEdicion] = useState("");
  const [fuente, setFuente] = useState("");
  const [enlace, setEnlace] = useState("");

  // Estados para tipos de documento
  const [tipos, setTipos] = useState<TipoDocumento[]>([]);
  const [, setLoadingTipos] = useState(false);
  const [tipoId, setTipoId] = useState<number>(0);
  const [tipoNombre, setTipoNombre] = useState("");

  // Estados para archivos
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchTipos();

    if (isEdit && bibliotecaAtomValue) {
      setTitulo(bibliotecaAtomValue.titulo);
      setAutor(bibliotecaAtomValue.autor);
      setImagen(bibliotecaAtomValue.imagen);
      setFechaPublicacion(bibliotecaAtomValue.fecha_publicacion);
      setEdicion(bibliotecaAtomValue.edicion);
      setFuente(bibliotecaAtomValue.fuente);
      setEnlace(bibliotecaAtomValue.enlace);
      setTipoId(bibliotecaAtomValue.tipo.id_tipo);
      setTipoNombre(bibliotecaAtomValue.tipo.tipo);
      setImagen(bibliotecaAtomValue.imagen);
      if (bibliotecaAtomValue.imagen?.startsWith('http')) {
        setImagePreview(bibliotecaAtomValue.imagen);
      }
    }
  }, [isEdit, bibliotecaAtomValue]);

  const fetchTipos = async () => {
    setLoadingTipos(true);
    try {
      const response: any = await apiService.get("tipos-documento/?skip=0&limit=100&incluir_bibliotecas=false");
      setTipos(response.data);
    } catch (error) {
      console.error("Error fetching tipos:", error);
    } finally {
      setLoadingTipos(false);
    }
  }

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `portada-${titulo}-${Date.now()}`);
    formData.append('tipo', 'biblioteca');

    setIsUploading(true);
    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadPDF = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `biblioteca-${titulo}-${Date.now()}`);
    formData.append('tipo', 'biblioteca');

    setIsUploading(true);

    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error uploading PDF:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      setEnlace(""); // Limpiar enlace si se sube archivo
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalPDFUrl = enlace;
    let finalImageUrl = imagen;

    try {
      // Subir imagen primero si hay archivo
      if (imageFile) {
        finalImageUrl = await handleImageUpload(imageFile);
      }

      // Subir PDF después si hay archivo
      if (pdfFile) {
        finalPDFUrl = await uploadPDF(pdfFile);
      }

      const libroData: Biblioteca = {
        id: isEdit && bibliotecaAtomValue ? bibliotecaAtomValue.id : Date.now(),
        titulo,
        autor,
        imagen: finalImageUrl, // Usar URL de imagen subida o ingresada
        fecha_publicacion: fechaPublicacion,
        edicion,
        tipo: {
          id_tipo: tipoId,
          tipo: tipoNombre,
        },
        id_tipo: tipoId,
        fuente,
        enlace: finalPDFUrl,
      };

      onSubmit(libroData);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return '';
    return isoDate.split('T')[0];
  };


  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
        
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título del Libro *</Label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Ej: Historia de los Andes"
            />
          </div>

          <div>
            <Label>Autor *</Label>
            <Input
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha de Publicación</Label>
              <Input
                type="date"
                value={formatDateForInput(fechaPublicacion)}
                onChange={(e) => setFechaPublicacion(e.target.value)}
              />
            </div>
            <div>
              <Label>Edición</Label>
              <Input
                value={edicion}
                onChange={(e) => setEdicion(e.target.value)}
                placeholder="Ej: Primera edición"
              />
            </div>
          </div>

          <div>
            <Label>Fuente</Label>
            <Input
              value={fuente}
              onChange={(e) => setFuente(e.target.value)}
              placeholder="Ej: Editorial Nacional"
            />
          </div>

          <div>
            <Label>Portada del Libro *</Label>
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
                      setImageFile(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                      setImagen(""); // Limpiar URL si suben archivo
                    }
                  }}
                  className="hidden"
                />
              </Label>
              {imageFile && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {imageFile.name}
                </span>
              )}
            </div>

            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Vista previa de portada"
                  className="h-40 object-contain rounded-md border"
                />
              </div>
            )}

            <div>
              <Label>O ingresar URL de la portada</Label>
              <Input
                value={imagen}
                onChange={(e) => {
                  setImagen(e.target.value);
                  setImageFile(null); // Limpiar archivo si ingresan URL
                  setImagePreview(null);
                }}
                placeholder="https://ejemplo.com/portada.jpg"
                disabled={!!imageFile}
              />
            </div>
          </div>

          <div>
            <Label>Documento PDF *</Label>
            <div className="mb-4">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" type="button" asChild>
                  <span>Seleccionar PDF</span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Label>
              {pdfFile && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {pdfFile.name}
                </span>
              )}
            </div>
            <div>
              <Label>O enlace externo al PDF</Label>
              <Input
                value={enlace}
                onChange={(e) => setEnlace(e.target.value)}
                placeholder="https://ejemplo.com/libro.pdf"
                disabled={!!pdfFile}
              />
            </div>
          </div>

          <div>
            <Label>Categoría *</Label>
            <Select
              value={tipoId.toString()}
              onValueChange={(value) => {
                const selected = tipos.find(t => t.id_tipo.toString() === value);
                if (selected) {
                  setTipoId(selected.id_tipo);
                  setTipoNombre(selected.tipo);
                }
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría">
                  {tipoNombre || "Selecciona una categoría"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tipos.map((tipo) => (
                  <SelectItem
                    key={tipo.id_tipo}
                    value={tipo.id_tipo.toString()}
                  >
                    {tipo.tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo archivo..." : "Guardar"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};