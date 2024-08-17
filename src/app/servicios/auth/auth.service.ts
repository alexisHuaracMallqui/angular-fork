import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  login(dni: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {dni, clave}).pipe(
      tap((response : any) => {
        if(response && response.token) {
          localStorage.setItem('token', response.token);
          console.log(response);
          console.log(localStorage);
        } else {
          console.error('Token not found in the response');
        }
      })
    )
  }

  registrar(dni: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, {dni, clave})
  }

  actualizarClave(dni: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/actualizar-clave`, {dni, clave})
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
