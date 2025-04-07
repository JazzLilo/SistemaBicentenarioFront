import { Categoria } from "./categoria";
import { Ubicacion } from "./ubicacion";

export interface Historia {
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    imagen: string;
    id_ubicacion: number;
    id_categoria: number;
    id: number;
    ubicacion: Ubicacion;
    categoria: Categoria;
}