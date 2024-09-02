import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ciclo } from '../../modelos/ciclo';

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  private apiUrl = 'http://localhost:3000/registro/ciclo';


  constructor(private http: HttpClient) { 
  }

  //Retornar ciclo
  getCiclo(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //Retornar ciclo por solicitud
  getCiclosBySolicitud(id_solicitud: number) {
    return this.http.get<Ciclo[]>(`${this.apiUrl}/solicitud/${id_solicitud}`);
  }

  //Crear ciclo
  createCiclo(ciclo: Ciclo) {
    return this.http.post(`${this.apiUrl}`, ciclo);
  }

  //Actualizar ciclo
  updateCiclo(ciclo: Ciclo) {
    return this.http.put(`${this.apiUrl}/${ciclo.id}`, ciclo);
  }

  //Eliminar ciclo
  deleteCiclo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
