export interface Biblioteca {
    id: number
    titulo: string
    autor: string
    imagen: string
    fecha_publicacion: string
    edicion: string
    tipo: {
        id_tipo: number
        tipo: string
    }
    id_tipo: number
    fuente: string
    enlace: string
}