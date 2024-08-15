export class Becas_Solicitudes{

nombre_completo: string;
dni: string;
celular: string;
genero:string;
fecha_nacimiento:string;
correo: string;
departamento:string;
provincia: string;
distrito:string;
direccion:string;
ingreso_familiar_mensual: number;
apoderado_nombre:string;
apoderado_dni: string;
apoderado_celular:string;
apoderado_correo: string;
institucion_nombre:string;
institucion_departamento: string;
institucion_provincia: string;
institucion_direccion: string;
tipo_educacion:string;
promedio_academico:number;
motivo_solicitud:string;


constructor(){
    this.nombre_completo = "";
    this.dni = "";
    this.celular = "";
    this.genero = "";
    this.fecha_nacimiento = "";
    this.correo = "";
    this.departamento = "";
    this.provincia = "";
    this.distrito = "";
    this.direccion = "";
    this.ingreso_familiar_mensual = 0;
    this.apoderado_nombre = "";
    this.apoderado_dni = "";
    this.apoderado_celular = "";
    this.apoderado_correo = "";
    this.institucion_nombre = "";
    this.institucion_departamento = "";
    this.institucion_provincia = "";
    this.institucion_direccion = "";
    this.tipo_educacion = "";
    this.promedio_academico = 0;
    this.motivo_solicitud = "";
}

}