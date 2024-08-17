import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  dni: string = '';
  clave: string = '';

constructor(private authService: AuthService, private router: Router){}
  
onLogin(){
 //this.router.navigate(['detalle'])
 this.authService.login(this.dni, this.clave).subscribe({
  next: (response : any) =>{
    console.log('Login successful');
    this.router.navigate(['detalle'])
  },
  error: (error) => {
    if(this.dni == '' || this.clave == '')
    {
      alert('Por favor ingresar DNI y clave para poder ingresar.')
    } else {
      alert('El DNI y/o la clave no coinciden')
    }
  }
 }
 )
}
  
}
