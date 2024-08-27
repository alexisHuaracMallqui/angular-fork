export class Curso {
  id: number;
  id_curso: number;
  tipo: string;
  nota: number;
  id_registro_ciclo: number;
  id_solicitud: number;
  creditos: number;
  nombre: string;

  constructor(
    id: number,
    id_curso: number,
    tipo: string,
    nota: number,
    id_registro_ciclo: number,
    id_solicitud: number,
    creditos: number,
    nombre: string
  ) {
    this.id = id;
    this.id_curso = id_curso;
    this.tipo = tipo;
    this.nota = nota;
    this.id_registro_ciclo = id_registro_ciclo;
    this.id_solicitud = id_solicitud;
    this.creditos = creditos;
    this.nombre = nombre;
  }
}
