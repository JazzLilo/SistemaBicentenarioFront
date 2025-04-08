import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { presidenteAtom } from "@/context/context";
import { Presidente } from "@/components/interface";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";

export interface FormPProps {
  mode?: "create" | "edit";
  onSubmit: (data: Presidente) => void;
}

export const FormP = ({ mode, onSubmit }: FormPProps) => {
  const [presidenteatm] = useAtom(presidenteAtom);
  const isEdit = mode === "edit" || (presidenteatm && presidenteatm.id);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [imagen, setImagen] = useState("");
  const [periodoInicio, setPeriodoInicio] = useState("");
  const [periodoFin, setPeriodoFin] = useState("");
  const [biografia, setBiografia] = useState("");
  const [partidoPolitico, setPartidoPolitico] = useState("");
  const [politicasClave, setPoliticasClave] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEdit && presidenteatm) {
      setNombre(presidenteatm.nombre);
      setApellido(presidenteatm.apellido);
      setImagen(presidenteatm.imagen);
      setPeriodoInicio(presidenteatm.periodo_inicio);
      setPeriodoFin(presidenteatm.periodo_fin);
      setBiografia(presidenteatm.biografia);
      setPartidoPolitico(presidenteatm.partido_politico);
      setPoliticasClave(presidenteatm.politicas_clave);
    }
  }, [isEdit, presidenteAtom]);

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
      setImagen(""); // Limpiar la URL si había una
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `${nombre}-${apellido}-${Date.now()}`);
    formData.append('tipo', 'presidente');
    
    try {
      setIsUploading(true);
      const uploadResponse:any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let finalImageUrl = imagen;
    
    // Si hay un archivo de imagen, subirlo primero
    if (imageFile) {
      try {
        finalImageUrl = await uploadImage(imageFile);
      } catch (error) {
        console.error("Failed to upload image");
        return;
      }
    }
    
    const presidenteData: Presidente = {
      id: isEdit && presidenteatm ? presidenteatm?.id : Date.now(),
      nombre,
      apellido,
      imagen: finalImageUrl,
      periodo_inicio: periodoInicio,
      periodo_fin: periodoFin,
      biografia,
      partido_politico: partidoPolitico,
      politicas_clave: politicasClave
    };
    
    onSubmit(presidenteData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Apellido</Label>
              <Input
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Período */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Inicio de Periodo</Label>
              <Input
                type="date"
                value={formatDateForInput(periodoInicio)}
                onChange={(e) => setPeriodoInicio(formatInputToISO(e.target.value))}
                required
              />
            </div>
            <div>
              <Label>Fin de Periodo</Label>
              <Input
                type="date"
                value={formatDateForInput(periodoFin)}
                onChange={(e) => setPeriodoFin(formatInputToISO(e.target.value))}
              />
            </div>
          </div>

          {/* Partido Político */}
          <div>
            <Label>Partido Político</Label>
            <Input
              value={partidoPolitico}
              onChange={(e) => setPartidoPolitico(e.target.value)}
              required
            />
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <Label>Imagen</Label>
            
            {/* Vista previa */}
            {(imagePreview || imagen) && (
              <div className="mb-4">
                <img 
                  src={imagePreview || imagen} 
                  alt="Vista previa" 
                  className="h-40 object-cover rounded-md border"
                />
              </div>
            )}

            {/* Subir archivo */}
            <div className="mb-4">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" type="button" asChild disabled={isUploading}>
                  <span>
                    {isUploading ? "Subiendo..." : "Seleccionar archivo"}
                  </span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </Label>
              {imageFile && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {imageFile.name}
                </span>
              )}
            </div>

            {/* O ingresar URL */}
            <div>
              <Label>O ingresar URL de imagen</Label>
              <Input
                value={imagen}
                onChange={(e) => {
                  setImagen(e.target.value);
                  setImageFile(null); // Limpiar el archivo si había uno
                  setImagePreview(null);
                }}
                placeholder="https://ejemplo.com/imagen.jpg"
                disabled={isUploading || !!imageFile}
              />
            </div>
          </div>

          {/* Biografía */}
          <div>
            <Label>Biografía</Label>
            <Textarea
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
              rows={5}
              required
              disabled={isUploading}
            />
          </div>

          {/* Políticas Clave */}
          <div>
            <Label>Políticas Clave (separadas por comas)</Label>
            <Textarea
              value={politicasClave}
              onChange={(e) => setPoliticasClave(e.target.value)}
              placeholder="Política 1, Política 2, Política 3"
              rows={3}
              disabled={isUploading}
            />
          </div>

          {/* Botón de envío */}
          <Button type="submit" className="w-full mt-4" disabled={isUploading}>
            {isUploading ? "Procesando..." : (isEdit ? "Guardar Cambios" : "Crear Presidente")}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};