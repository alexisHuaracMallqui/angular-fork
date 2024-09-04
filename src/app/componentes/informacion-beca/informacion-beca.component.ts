import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { format } from 'date-fns';
import moment from 'moment';
import { MallaCurricularService } from '../../servicios/malla-curricular/malla-curricular.service';
import { CicloMalla } from '../../modelos/ciclo-malla';
import { CursoMalla } from '../../modelos/curso-malla';
import { RelacionMalla } from '../../modelos/relacion-malla';
import { Ciclo } from '../../modelos/ciclo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-informacion-beca',
  templateUrl: './informacion-beca.component.html',
  styleUrl: './informacion-beca.component.css'
})
export class InformacionBecaComponent implements OnInit {

  solicitud: any;
  ciclosMallaLista?: CicloMalla[];
  cursoMallaLista?: CursoMalla[];
  cicloCursoRelacion?: RelacionMalla[];
  selectedCicloId?: number;
  url_foto_estudiante = new FormData();
  url_doc_contrato = new FormData();
  id_malla_curricular = new FormData();
  formInfoPeriodo = this.formBuilder.group({
    nombre_completo: [{ value: '', disabled: true }],
    dni: [{ value: '', disabled: true }],
    institucion_nombre: [{ value: '', disabled: true }],
    fecha_inicio: ['', [Validators.required]],
    fecha_fin_estimada: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private http: HttpClient,
    private mallaCurricularService: MallaCurricularService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.solicitud = this.solicitudService.getSolicitudData();
    if (this.solicitud) {
      this.formInfoPeriodo.patchValue({
        dni: this.solicitud.dni,
        nombre_completo: this.solicitud.nombre_completo,
        institucion_nombre: this.solicitud.institucion_nombre,
        fecha_inicio: this.solicitud.fecha_inicio,
        fecha_fin_estimada: this.solicitud.fecha_fin_estimada
      });

      const fecha_inicial = this.solicitud.fecha_inicio;
      const fecha_estimada = this.solicitud.fecha_fin_estimada;

      const formattedDateInitial = this.formatDateForInput(fecha_inicial);
      const formattedDateFinal = this.formatDateForInput(fecha_estimada);

      this.formInfoPeriodo.patchValue({
        fecha_inicio: formattedDateInitial,
        fecha_fin_estimada: formattedDateFinal
      });

      //Obteniendo Malla por ID Solicitud
      this.getMallaCiclos();

    } else {
      console.error('Solicitud data is not available');
    }

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
      this.url_doc_contrato.append('file', file, file.name);
    }
  }


  updateInformacionBecario() {

    const cargaArchivos = [
      this.http.post('http://localhost:3000/upload', this.url_foto_estudiante),
      this.http.post('http://localhost:3000/upload', this.id_malla_curricular),
      this.http.post('http://localhost:3000/upload', this.url_doc_contrato)
    ]

    forkJoin(cargaArchivos).subscribe({
      next: (responses: any[]) => {
        this.solicitud.url_foto_estudiante = responses[0].url;
        this.solicitud.id_malla_curricular = responses[1].url;
        this.solicitud.url_doc_contrato = responses[2].url;


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

      },
      error: (error) => {
        console.error('Error subiendo archivos', error);
      }
    })
  }

  submitForm() {
    if (this.formInfoPeriodo.valid) {
      this.updateInformacionBecario();
    } else {
      console.log('Formulario invalido');
    }
  }

  formatDateForInput(dateString: string): string {
    return moment.utc(dateString).format('YYYY-MM-DD');
  }


  getMallaCiclos() {
    if (this.solicitud && this.solicitud.id) {
      this.mallaCurricularService.getCiclosMallaBySolicitud(this.solicitud.id).subscribe({
        next: (ciclos: CicloMalla[]) => {
          console.log('Ciclos received:', ciclos);
          this.ciclosMallaLista = ciclos;

          this.fetchCursosForCiclos(ciclos);
        },
        error: (error) => {
          console.error('Error fetching ciclos', error);
        }
      });
    } else {
      console.error('id_solicitud is undefined or not available');
    }
  }


  fetchCursosForCiclos(ciclos: CicloMalla[]) {
    if (ciclos.length === 0) {
      return;
    }

    const cursoRequests = ciclos.map(ciclo =>
      this.mallaCurricularService.getCursoMallaByCiclo(ciclo.id).pipe(
        map(cursos => ({ ciclo, cursos }))
      )
    );

    forkJoin(cursoRequests).subscribe({
      next: (cicloCursoPairs: RelacionMalla[]) => {
        this.cicloCursoRelacion = cicloCursoPairs;
        console.log('Ciclos and Cursos recibidos:', cicloCursoPairs);
      },
      error: (error) => {
        console.error('Error fetching cursos', error);
      }
    });
  }

  /*
  deleteCurso(id_ciclo: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.mallaCurricularService.deleteCursoMallaByCiclo(id_ciclo).subscribe({
        next: (response) => {
          alert('Course deleted successfully!');
          this.getMallaCiclos();
        },
        error: (error) => {
          console.error('There was an error!', error);
          alert('An error occurred while deleting the course.');
        }
      });
    }
  }*/


  deleteCicloAll(ciclo: CicloMalla): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el ciclo ${ciclo.nombre}?`)) {
      this.mallaCurricularService.deleteCursoMallaByCiclo(ciclo.id).subscribe({
        next: () => {
          this.mallaCurricularService.deleteCicloMalla(ciclo).subscribe({
            next: (response) => {
              console.log('CicloMalla deleted successfully:', response);
              this.getMallaCiclos();
              //Para revisar ese query
              //this.ciclosMallaLista = this.ciclosMallaLista?.filter(c => c.id !== ciclo.id);
            },
            error: (err) => {
              console.error('Error deleting CicloMalla:', err);
              alert('Error al eliminar Ciclo')
            }
          });
        },
        error: (err) => {
          console.error('Error deleting CursoMalla by ciclo:', err);
          alert('Error al eliminar el curso del ciclo')
        }
      });
    }
  }

  selectCiclo(id: number): void {
    this.selectedCicloId = id;
    console.log('Selected Ciclo ID:', id);
    this.navigateToEditMallaCursos();
  }

  navigateToEditMallaCursos(): void {
    if (this.selectedCicloId !== null) {
      this.router.navigate(['/informacion', this.selectedCicloId]);
    } else {
      console.error('No Ciclo ID selected');
    }
  }

}
