export class CursoMalla {
    id: number;
    Nombre: string;
    creditos: number;
    id_ciclo: number;
    tipo: string;

    constructor(id:number, nombre: string, creditos: number, id_ciclo: number, tipo: string) {
        this.id = id;
        this.Nombre = nombre;
        this.creditos = creditos;
        this.id_ciclo = id_ciclo;
        this.tipo = tipo;
    }
   
}
