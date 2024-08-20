import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private solicitudData : any;
  private apiUrl = 'http://localhost:3000/solicitudes';


  constructor(private http: HttpClient) {
    
   }

  //setear data solicitud después del login
  setSolicitudData(data: any) {
    this.solicitudData = data;
    localStorage.setItem('solicitudData', JSON.stringify(data));
  }


  //obtener datos solicitud
  getSolicitudData() {
    const storedSolicitudData = localStorage.getItem('solicitudData');
    if (storedSolicitudData) {
      return JSON.parse(storedSolicitudData);
    }
  }


  //limpiar data solicitud
  clearSolicitudData() {
    this.solicitudData = null;
    localStorage.removeItem('userData');
  }

  //actualizar datos solicitud
  updateSolicitud(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${data.id}`,data);
  };

  getSolicitudByDni(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dni/${dni}`)
  }

}
