// FormCultura.tsx
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { culturaAtom } from "@/context/context";
import { Cultura } from "@/components/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";
import { MapaInteractivo } from "../map/Mapainteractivo";


export interface FormCulturaProps {
  mode?: "create" | "edit";
  onSubmit: (data: Cultura) => void;
}

export const FormCultura = ({ mode, onSubmit }: FormCulturaProps) => {
  const [culturaAtomValue] = useAtom(culturaAtom);
  const isEdit = mode === "edit" || (culturaAtomValue && culturaAtomValue.id);

  // Estado del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");


  const [showMap, setShowMap] = useState(false);
  const [ubicacionInfo, setUbicacionInfo] = useState({
    id: 0,
    nombre: "",
    latitud: -19.6133,
    longitud: -65.7533,
    imagen: "",
    descripcion: "",
  });


  // Estados para imagen de cultura
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, setIsUploading] = useState(false);

  //Estaos para imagen de ubicacion
  const [imagenUbicacion, setImagenUbicacion] = useState<File | null>(null)
  const [imagePreviewUbicacion, setImagePreviewUbicacion] = useState<string | null>(null);
  const [, setIsUploadingUbicacion] = useState(false);



  useEffect(() => {
    if (isEdit && culturaAtomValue) {
      setNombre(culturaAtomValue.nombre);
      setDescripcion(culturaAtomValue.descripcion);
      setImagen(culturaAtomValue.imagen);
      setUbicacionInfo({
        id: culturaAtomValue.id_ubicacion,
        nombre: culturaAtomValue.ubicacion?.nombre || "",
        latitud: culturaAtomValue.ubicacion?.latitud || -19.6133,
        longitud: culturaAtomValue.ubicacion?.longitud || -65.7533,
        imagen: culturaAtomValue.ubicacion?.imagen || "",
        descripcion: culturaAtomValue.ubicacion?.descripcion || "",
      });
      setImagePreview(culturaAtomValue.imagen);
    }
  }, [isEdit, culturaAtomValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagen("");
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
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

  const handleImagenUbicacionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploadingUbicacion(true);

    const file = e.target.files?.[0];
    if (file) {
      setImagenUbicacion(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUbicacion(reader.result as string);
      reader.readAsDataURL(file);
    }

      
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `cultura-${nombre}-${Date.now()}`);
    formData.append('tipo', 'cultura');

    setIsUploading(true);

    try {
      const uploadResponse: any = await apiService.postFiles('files/upload', formData);
      return uploadResponse.data.file_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

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
  
    let finalImageUrl = imagen;
    let ubicacionImageUrl = ubicacionInfo.imagen;
  
    try {
      // Subir imagen de cultura si hay archivo
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }
  
      // Subir imagen de ubicación si hay archivo
      if (imagenUbicacion) {
        ubicacionImageUrl = await uploadUbicacionImage(imagenUbicacion);
      }
  
      // Crear objeto final con los datos actualizados
      const culturaData: Cultura = {
        id: isEdit && culturaAtomValue ? culturaAtomValue.id : Date.now(),
        nombre,
        descripcion,
        imagen: finalImageUrl,
        id_ubicacion: ubicacionInfo.id,
        ubicacion: {
          ...ubicacionInfo,
          imagen: ubicacionImageUrl // Usamos la URL actualizada
        }
      };
  
      onSubmit(culturaData);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Editar Cultura" : "Crear Nueva Cultura"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nombre de la Cultura *</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Cultura Tiwanaku"
            />
          </div>

          <div>
            <Label>Descripción *</Label>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows={4}
              placeholder="Descripción detallada..."
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen de Cultura</Label>
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Vista previa cultura"
                  className="h-40 object-cover rounded-md border"
                />
              </div>
            )}
            {imagen && !imagePreview && (
              <div className="mb-4">
                <img
                  src={imagen}
                  alt="Imagen existente"
                  className="h-40 object-cover rounded-md border"
                />
              </div>
            )}
            <div className="mb-4">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" type="button" asChild>
                  <span>Seleccionar archivo</span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    

                    handleImageUpload(e);
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
            <div>
              <Label>O ingresar URL de imagen</Label>
              <Input
                id="file-upload-url"
                value={imagen}
                onChange={(e) => {
                  setImageFile(null);
                  setImagePreview(null);
                  setImagen(e.target.value);
                }
                }
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
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
                      onChange={(e)=>
                      {                
                    handleImagenUbicacionUpload(e);
                      }
                      }
                      className="hidden"
                    />
                  </Label>
                  {imageFile && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {imageFile.name}
                    </span>
                  )}
                </div>
                <div>
                  <Label>O ingresar URL de imagen</Label>
                  <Input
                    id="file-upload-ubicacion-url"
                    value={ubicacionInfo.imagen}
                    onChange={(e) => {
                      setImagenUbicacion(null);
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
          <Button type="submit" className="w-full mt-4" >
            Guardar
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};