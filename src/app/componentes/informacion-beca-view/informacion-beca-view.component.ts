import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { MallaCurricularService } from '../../servicios/malla-curricular/malla-curricular.service';
import { CicloService } from '../../servicios/ciclo/ciclo.service';
import { Ciclo } from '../../modelos/ciclo';
import { CicloMalla } from '../../modelos/ciclo-malla';
import { CursoMalla } from '../../modelos/curso-malla';
import { CursoService } from '../../servicios/curso/curso.service';
import { Curso } from '../../modelos/curso';
import { Router } from '@angular/router';


@Component({
  selector: 'app-informacion-beca-view',
  templateUrl: './informacion-beca-view.component.html',
  styleUrl: './informacion-beca-view.component.css'
})
export class InformacionBecaViewComponent implements OnInit{
  solicitud: any;
  listCiclos: Array<Ciclo> = [];
  numCursosMap = new Map<number, number>();
  listCiclosMalla: Array<CicloMalla> = [];
  listCursosMalla: Array<CursoMalla> = []

  constructor (
    private solicitudService: SolicitudService,
    private mallaService: MallaCurricularService,
    private cicloService: CicloService,
    private cursoService: CursoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

  }
/*
  ngOnInit(): void {
    this.solicitudService.getSolicitudData().subscribe(data => {
      this.solicitud = data;
      if(this.solicitud){
        this.cicloService.getCiclosBySolicitud(this.solicitud.id).subscribe({
          next: (listCiclo: Array<Ciclo>) => {
            this.listCiclos = listCiclo;
            this.listCiclos.forEach(ciclo => {
              try {
                this.getNumCursos(ciclo.id).then(numCursos => {
                  this.numCursosMap.set(ciclo.id, numCursos);
                  this.cdr.detectChanges();
                });
              } catch (error) {
                console.error('Error obteniendo el número de cursos', error)
              }
            })
            this.cdr.detectChanges();
          }
        })
      }
    });
    this.cdr.detectChanges();
  }*/

    ngOnInit(): void {
      this.solicitudService.getSolicitudData().subscribe(data => {
        this.solicitud = data;
        if(this.solicitud){
          this.cicloService.getCiclosBySolicitud(this.solicitud.id).subscribe({
            next: (listCiclo: Array<Ciclo>) => {
              this.listCiclos = listCiclo;
              this.listCiclos.forEach(ciclo => {
                try {
                  this.cursoService.getCursoByCiclo(ciclo.id).subscribe({
                    next: (listCursos: Array<Curso>) => {
                      this.numCursosMap.set(ciclo.id, listCursos.length);
                    }
                  })
                } catch (error) {
                  console.error('Error obteniendo el número de cursos', error)
                }
              })
              this.cdr.detectChanges();
            }
          })
        }
      });
      this.cdr.detectChanges();
    }


 //Seleccionar Ciclo
 selectCiclo(ciclo: Ciclo): void {
  this.cicloService.setSelectedCiclo(ciclo);
  this.router.navigate(['/concepto-modulo-academico'])
 }
}
