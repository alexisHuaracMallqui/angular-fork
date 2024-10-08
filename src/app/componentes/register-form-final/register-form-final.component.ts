import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormularioBecasService } from '../../servicios/formulario-becas.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-register-form-final',
  templateUrl: './register-form-final.component.html',
  styleUrl: './register-form-final.component.css'
})
export class RegisterFormFinalComponent implements OnInit {


  url_evidencia = new FormData();
  url_dni = new FormData();
  url_certificado = new FormData();
  url_comprobante = new FormData();


  formData: any = {};

  constructor(private http: HttpClient, private formDataService: FormularioBecasService, private router: Router) { }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
  }



  onFileChange_evidencia_academica(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.url_evidencia.append('file', file, file.name)

    }
  }

  onFileChange_dni(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.url_dni.append('file', file, file.name)
    }
  }
  onFileChange_certifcado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.url_certificado.append('file', file, file.name)
    }
  }
  onFileChange_comprobante(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.url_comprobante.append('file', file, file.name)
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    //Lista de solicitudes HTTP para subir archivos
    const cargaArchivos = [
      this.http.post('http://localhost:3000/upload', this.url_evidencia),
      this.http.post('http://localhost:3000/upload', this.url_dni),
      this.http.post('http://localhost:3000/upload', this.url_certificado),
      this.http.post('http://localhost:3000/upload', this.url_comprobante)
    ]

    forkJoin(cargaArchivos).subscribe({
      next: (responses: any[]) => {
        this.formData.url_doc_academico = responses[0].url;
        this.formData.url_dni = responses[1].url;
        this.formData.url_certificado_estudios = responses[2].url;
        this.formData.url_comprobando_domicilio = responses[3].url;
        this.formData.EvaluacionEstado = 'Enviado';
        this.formData.contratoBecario = '0';
        console.log(this.formData);


        this.http.post('http://localhost:3000/solicitudes/upsert', this.formData).subscribe({
          next: (response: any) => {
            if (response.value == '0') {
              alert(response.message);
            } else {
              console.log('Solicitud creada', response);
              alert("Solicitud enviada correctamente.");
              this.router.navigate(['/']);
              this.formDataService.clearFormData();
            }
          },
          error: (error) => {
            console.error('Upload error', error);
          }
        });

      },
      error: (error) => {
        console.error('Error subiendo archivos', error);
      }
    })




  }

  backtStepFinal() {
    this.router.navigate(['register-form-next']);
    this.formDataService.clearFormData();
  }

}
