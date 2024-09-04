export class CicloMalla {
    id: number;
    numero: number;
    nombre: string;
    id_solicitud: number

    constructor(id:number, numero: number, nombre: string, id_solicitud: number){
        this.id = id;
        this.numero = numero;
        this.nombre = nombre;
        this.id_solicitud = id_solicitud
    }
}
