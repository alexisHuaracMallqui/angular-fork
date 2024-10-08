import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ciclo } from '../../modelos/ciclo';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  private apiUrl = 'http://localhost:3000/registro/ciclo';
  private selectedCiclo: Ciclo | null = null;
  private readonly STORAGE_KEY = 'selectedCiclo'


  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { 
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
    return this.http.put<Ciclo>(`${this.apiUrl}/${ciclo.id}`, ciclo);
  }

  //Eliminar ciclo
  deleteCiclo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  //setear ciclo seleccionado
  setSelectedCiclo(ciclo: Ciclo): void {
    this.selectedCiclo = ciclo;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ciclo));
  }


  //obtener ciclo seleccionado
  getSelectedCiclo(): Ciclo | null {
    if(this.selectedCiclo) return this.selectedCiclo;

    const cicloData = localStorage.getItem(this.STORAGE_KEY);
    if (cicloData) {
      this.selectedCiclo = JSON.parse(cicloData);
    }

    return this.selectedCiclo;
  }

  //Limpiar ciclo seleccionado
  clearSelectedCiclo(): void {
    this.selectedCiclo = null;

    localStorage.removeItem(this.STORAGE_KEY);
  }

  //Formatear fecha
  formatDate(date: Date): string  {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }
}
