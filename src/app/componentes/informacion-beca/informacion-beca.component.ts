import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-informacion-beca',
  templateUrl: './informacion-beca.component.html',
  styleUrl: './informacion-beca.component.css'
})
export class InformacionBecaComponent implements OnInit {

  solicitud: any;
  url_foto_estudiante = new FormData();
  contratoBecario = new FormData();
  id_malla_curricular = new FormData();
  formInfoPeriodo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private http: HttpClient
  ) {
    // Initialize the FormGroup
    this.formInfoPeriodo = this.formBuilder.group({
      nombre_completo: new FormControl(''),
      dni: new FormControl(''),
      institucion_nombre: new FormControl(''),
      fecha_inicio: new FormControl('', Validators.required), 
      fecha_fin_estimada: new FormControl('', Validators.required) 
    });
  }

  ngOnInit(): void {
    this.solicitudService.getSolicitudData().subscribe(data => {
      this.solicitud = data;
      if (this.solicitud) {
        this.formInfoPeriodo.patchValue({
          dni: this.solicitud.dni,
          nombre_completo: this.solicitud.nombre_completo,
          institucion_nombre: this.solicitud.institucion_nombre,
          fecha_inicio: this.solicitud.fecha_inicio,
          fecha_fin_estimada: this.solicitud.fecha_fin_estimada
        });
      }
    });
  }

  onFileChange_url_foto_estudiante(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.url_foto_estudiante.append('file', file, file.name);
    }
  }

  onFileChange_id_malla_curricular(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.id_malla_curricular.append('file', file, file.name);
    }
  }

  onFileChange_contratoBecario(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.contratoBecario.append('file', file, file.name);
    }
  }

  updateInformacionBecario() {
    // Prepare the file upload requests
  /*
    const cargaArchivos: Observable<any>[] = [];

    if (this.url_foto_estudiante.has('file')) {
      cargaArchivos.push(this.http.post('http://localhost:3000/upload', this.url_foto_estudiante));
    }
    if (this.id_malla_curricular.has('file')) {
      cargaArchivos.push(this.http.post('http://localhost:3000/upload', this.id_malla_curricular));
    }
    if (this.contratoBecario.has('file')) {
      cargaArchivos.push(this.http.post('http://localhost:3000/upload', this.contratoBecario));
    }

    // Execute all file upload requests in parallel
    forkJoin(cargaArchivos).subscribe({
      next: (responses: any[]) => {
        // Map responses to corresponding file URLs
        responses.forEach((response, index) => {
          if (index === 0) {
            this.solicitud.url_foto_estudiante = response.url;
          } else if (index === 1) {
            this.solicitud.id_malla_curricular = response.url;
          } else if (index === 2) {
            this.solicitud.contratoBecario = response.url;
          }
        });
*/

        this.solicitud.fecha_inicio = this.formInfoPeriodo.get('fecha_inicio')?.value;
        this.solicitud.fecha_fin_estimada = this.formInfoPeriodo.get('fecha_fin_estimada')?.value;

        this.solicitudService.updateSolicitud(this.solicitud).subscribe({
          next: (response: any) => {
            console.log('Se actualizó correctamente', response);
          },
          error: (error: any) => {
            console.error('Error al actualizar información', error);
          }
        });
     //},
     /*error: (error) => {
        console.error('Error subiendo archivos', error);*/
      }
    //});
  }
//}


