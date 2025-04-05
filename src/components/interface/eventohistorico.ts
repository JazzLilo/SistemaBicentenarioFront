import { Ubicacion } from './ubicacion';

export interface EventHistorico {
    id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    tipo: string;
    id_ubicacion: number;
    ubicacion: Ubicacion;
}

export interface Multimedia {
    url: string;
    tipo:string;
    id_evento_historico: number;
    id: number;
}