import React from 'react'
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { historiaAtom } from "@/context/context";
import { MapaInteractivo } from "../map/Mapainteractivo";
import { Historia, Categoria } from "@/components/interface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiService";


export const FormUbicacion = () => {

    const [imageFileU, setImageUFile] = useState<File | null>(null);
    const [imagePreviewU, setImageUPreview] = useState<string | null>(null);
    

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
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
                <Label>Imagen Ubicacion</Label>
                {(imagePreviewU || ubicacionInfo.imagen) && (
                    <div className="mb-4">
                        <img
                            id="preview-image-ubicacion"
                            src={imagePreviewU || ubicacionInfo.imagen}
                            alt="Vista previa Ubicacion"
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
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </Label>
                    {imageFileU && (
                        <span className="ml-2 text-sm text-muted-foreground">
                            {imageFileU.name}
                        </span>
                    )}
                </div>

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
    )
}
