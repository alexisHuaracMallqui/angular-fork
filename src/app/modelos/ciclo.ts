export class Ciclo {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  periodo: string;
  creditos: string;
  id_solicitud: number;
  id_documento_evidencia: string;
  id_ciclo: number;
  id_doc_matricula: string;
  estado: string;

  constructor(
    id: number,
    fecha_inicio: Date,
    fecha_fin: Date,
    periodo: string,
    creditos: string,
    id_solicitud: number,
    id_documento_evidencia: string,
    id_ciclo: number,
    id_doc_matricula: string,
    estado: string
  ) {
    this.id = id;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.periodo = periodo;
    this.creditos = creditos;
    this.id_solicitud = id_solicitud;
    this.id_documento_evidencia = id_documento_evidencia;
    this.id_ciclo = id_ciclo;
    this.id_doc_matricula = id_doc_matricula;
    this.estado = estado;
  }
}
