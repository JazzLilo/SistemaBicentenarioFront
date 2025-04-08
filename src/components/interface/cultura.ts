import { Ubicacion } from "./ubicacion";
export interface Cultura{
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    id_ubicacion: number;
    ubicacion: Ubicacion;

}