import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormularioBecasService } from '../../servicios/formulario-becas.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-register-form-final',
  templateUrl: './register-form-final.component.html',
  styleUrl: './register-form-final.component.css'
})
export class RegisterFormFinalComponent implements OnInit {

  /*
  selectedFile: File | null = null;
  formData: any = {};
  registrationFormFinal = this.fb.group({

   file:['',[Validators.required]]
  
  })
  
  constructor(private http: HttpClient, private router: Router, private formDataService: FormularioBecasService, private fb: FormBuilder) { }


  backtStepFinal(){
    this.router.navigate(['nextstep'])
   }

   ngOnInit() {
    this.formData = this.formDataService.getFormData();
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registrationFormFinal.patchValue({ file: file.name });  // Optional: display filename
    }
  }


   saveFinalFields() {


    /*
    this.formData = { ...this.formData, file: this.registrationFormFinal.value.file };
    this.formDataService.setFormData(this.formData);


   this.http.post("http://localhost:3000/api/upload", this.formData).subscribe((resultData: any) => {
  console.log(resultData);
  alert("Form Data Saved Successfully");
  this.formDataService.clearFormData(); // Clear the form data
});
}


onSubmit(){
  console.log(this.registrationFormFinal.value);
}
*/


  url: File | null = null;
  url_dni: File | null = null;
  url_certificado: File | null = null;
  url_comprobante: File | null = null;

  formData: any = {};

  constructor(private http: HttpClient, private formDataService: FormularioBecasService, private router: Router) { }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
  }



  onFileChange_evidencia_academica(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.url = input.files[0];
    }
  }

  onFileChange_dni(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.url_dni = input.files[0];
    }
  }
  onFileChange_certifcado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.url_certificado = input.files[0];
    }
  }
  onFileChange_comprobante(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.url_comprobante = input.files[0];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const formDataFinal = new FormData();


    if (this.url) {
      formDataFinal.append('url', this.url, this.url.name)
    };

    if (this.url_dni) {
      formDataFinal.append('url_dni', this.url_dni, this.url_dni.name)
    };

    if (this.url_certificado) {
     formDataFinal.append('url_certificado', this.url_certificado, this.url_certificado.name)
    };

    if (this.url_comprobante) {
     formDataFinal.append('url_comprobante', this.url_comprobante, this.url_comprobante.name)
    };

    // Append other form data from this.formData to formDataFinal
    for (let key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
        formDataFinal.append(key, this.formData[key]);
      }
    }


    // Append other form data from this.formData
    this.http.post('http://localhost:3000/solicitudes', this.formData).subscribe({
      next: (response) => {
        console.log('Upload successful', response);
        alert("Form Data Saved Successfully");
        this.router.navigate(['register-form']);
        this.formDataService.clearFormData();
      },
      error: (error) => {
        console.error('Upload error', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  backtStepFinal() {
    this.router.navigate(['register-form-next']);
    this.formDataService.clearFormData();
  }

}
