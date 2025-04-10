export interface User {
    apellidoMaterno?: string;
    apellidoPaterno?: string;
    cantIntentos: number;
    ciudad?: string;
    correo? : string;
    email_verified_at? : string;
    estado? : boolean;
    genero? : string;
    id : number;
    imagen? : string;
    nombre? : string;
    pais? : string;
    telefono? : string;
    ultimoIntentoFallido? : string;
    roles? : string[];
}