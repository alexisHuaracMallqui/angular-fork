import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../../modelos/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = 'http://localhost:3000/registro/curso';

  constructor(private http: HttpClient) { 
  }

  //Retornar curso
  getCurso(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //Retornar curso por ciclo
  getCursoByCiclo(id_registro_ciclo: number) {
    return this.http.get(`${this.apiUrl}/ciclo/${id_registro_ciclo}`);
  }

  //Crear curso 
  createCurso(curso: Curso) {
    return this.http.post(`${this.apiUrl}`, curso);
  }

  //Actualizar curso 
  updateCurso(curso: Curso) {
    return this.http.put(`${this.apiUrl}/${curso.id}`, curso);
  }

  //Eliminar curso 
  deleteCurso(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

