import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  siteKey: string;
  dni: string = '';
  clave: string = '';

  loginFormGroup = this.formLogin.group({
    dni: ['', Validators.required],
    clave: ['', Validators.required]
  });

  constructor(private authService: AuthService, private router: Router, private formLogin: FormBuilder) {
    this.siteKey = '6LcZfCsqAAAAAOq1XKb40u3iAqU6etAVZrFu8JEi';
  }

  ngOnInit() {

  }


  onLogin() {
    //this.router.navigate(['detalle'])  
        console.log('Login successful');
        this.router.navigate(['detalle'])
      
    
    
  }

}
