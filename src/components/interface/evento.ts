import { Ubicacion } from './ubicacion';
import { User } from './user';
export interface Evento {
    nombre: string;
    categoria: string;
    estado:string;
    descripcion: string;
    fecha_hora: string;
    id_ubicacion: number;
    id_organizador: number;
    imagen: string;
    id: number;
    ubicacion: Ubicacion;
    organizador: User;
}