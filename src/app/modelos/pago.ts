export class Pago {
  id: number;
  fecha_solicitud: Date;
  monto: number;
  concepto: string;
  descripcion: string;
  id_constancia_pago: string;
  id_solicitud: number;
  id_registroCiclo: number;
  ContabilidadEstado: string;
  TesoreriaEstado: string;
  PagoEstado: string;
  adminestado: string;
  EstudianteEstado: string;

  constructor(
    id: number,
    fecha_solicitud: Date,
    monto: number,
    concepto: string,
    descripcion: string,
    id_constancia_pago: string,
    id_solicitud: number,
    id_registroCiclo: number,
    ContabilidadEstado: string,
    TesoreriaEstado: string,
    PagoEstado: string,
    adminestado: string,
    EstudianteEstado: string
  ) {
    this.id = id;
    this.fecha_solicitud = fecha_solicitud;
    this.monto = monto;
    this.concepto = concepto;
    this.descripcion = descripcion;
    this.id_constancia_pago = id_constancia_pago;
    this.id_solicitud = id_solicitud;
    this.id_registroCiclo = id_registroCiclo;
    this.ContabilidadEstado = ContabilidadEstado;
    this.TesoreriaEstado = TesoreriaEstado;
    this.PagoEstado = PagoEstado;
    this.adminestado = adminestado;
    this.EstudianteEstado = EstudianteEstado;
  }
}
