import { Component, OnInit } from '@angular/core';
import { CicloMalla } from '../../modelos/ciclo-malla';
import { CursoMalla } from '../../modelos/curso-malla';
import { MallaCurricularService } from '../../servicios/malla-curricular/malla-curricular.service';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-ciclo-academico',
  templateUrl: './nuevo-ciclo-academico.component.html',
  styleUrl: './nuevo-ciclo-academico.component.css',
})
export class NuevoCicloAcademicoComponent implements OnInit {
  solicitud: any;
  listCicloMalla: Array<CicloMalla> = [];
  listCurso: Array<CursoMalla> = [];
  listCursoPopUp: Array<CursoMalla> = [];
  cursoSeleccionadoPopUp: CursoMalla = new CursoMalla(0,'',0,0,'');

  constructor(
    private mallaService: MallaCurricularService,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.solicitudService.getSolicitudData().subscribe((data) => {
      this.solicitud = data;
      if (this.solicitud) {
        this.mallaService
          .getCiclosMallaBySolicitud(this.solicitud.id)
          .subscribe({
            next: (listCiclo: Array<CicloMalla>) => {
              this.listCicloMalla = listCiclo;
            },
            error: (error) => {
              console.error('Error obteniendo ciclos:', error);
            }
          });
      }
    });
  }

  obtenerCursosDeCicloMalla(cicloMalla: any) {
    this.mallaService.getCursoMallaByCiclo(cicloMalla.target.value).subscribe({
      next: (listCurso: Array<CursoMalla>) => {
        this.listCurso = listCurso;
      },
      error: (error) => {
        console.error('Error obteniendo cursos:', error);
      }
    })
  }

  quitarCursoDeLista(cursoAEliminar: CursoMalla) {
    this.listCurso = this.listCurso.filter(
      curso => curso.id !== cursoAEliminar.id
    );
  }

  onAgregarCursoCicloChange(cicloSeleccionado: any): void {
    this.mallaService.getCursoMallaByCiclo(cicloSeleccionado.target.value).subscribe({
      next: (listCurso: Array<CursoMalla>) => {
        this.listCursoPopUp = listCurso;
      },
      error: (error) => {
        console.error('Error obteniendo cursos:', error);
      }
    })
  }

  onAgregarCursoChange(cursoSeleccionado: any){
    const curso = this.listCursoPopUp.find(curso => curso.id == cursoSeleccionado.target.value)
    if (curso) {
      this.cursoSeleccionadoPopUp = curso;
    }
  }

  agregarCurso(): void {
    if (this.cursoSeleccionadoPopUp) {
      this.listCurso.push(this.cursoSeleccionadoPopUp);
      this.cursoSeleccionadoPopUp = new CursoMalla(0,'',0,0,'');
    }
  }

  contarCursos(): number {
    return this.listCurso.length;
  }

  sumarCredito(): number {
    return this.listCurso.reduce((total, curso) => total + curso.creditos, 0);
  }

}

