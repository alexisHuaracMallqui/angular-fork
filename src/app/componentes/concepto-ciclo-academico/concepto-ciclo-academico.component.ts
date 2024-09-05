import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Ciclo } from '../../modelos/ciclo';
import { CicloService } from '../../servicios/ciclo/ciclo.service';
import { Router } from '@angular/router';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { Curso } from '../../modelos/curso';
import { CursoService } from '../../servicios/curso/curso.service';
import { Pago } from '../../modelos/pago';
import { PagoService } from '../../servicios/pago/pago.service';

@Component({
  selector: 'app-concepto-ciclo-academico',
  templateUrl: './concepto-ciclo-academico.component.html',
  styleUrl: './concepto-ciclo-academico.component.css'
})
export class ConceptoCicloAcademicoComponent implements OnInit{

  solicitud: any;
  selectedCiclo: Ciclo | null = null;
  listCursos: Array<Curso> = [];
  listPagos: Array<Pago> = [];
  
  constructor(
    private router: Router,
    private solicitudService: SolicitudService,
    private cicloService: CicloService,
    private cursoService: CursoService,
    private pagoService: PagoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.solicitudService.getSolicitudData().subscribe(data => {
      this.solicitud = data;
      if(this.solicitud){
        this.selectedCiclo = this.cicloService.getSelectedCiclo();
        if(this.selectedCiclo){
          //Obtener cursos del ciclo
          this.cursoService.getCursoByCiclo(this.selectedCiclo.id).subscribe({
            next: (listCurso: Array<Curso>) => {
              this.listCursos = listCurso;
              this.cdr.detectChanges();
            }
          })
          //Obtener pagos del ciclo
          this.pagoService.getPagoByCiclo(this.selectedCiclo.id).subscribe({
            next: (listPagos: Array<Pago>) => {
              this.listPagos = listPagos;
              this.cdr.detectChanges();
            }
          })
          this.cdr.detectChanges();
        }
      }
    })
  }


  //Retorna el numero de cursos
  getNumCursos(): number {
    return this.cursoService.getNumCursos(this.listCursos);
  }

  //Retorna el total de creditos
  getTotaCreditos(): number{
    return this.cursoService.getTotalCreditos(this.listCursos);
  }

  //Retorna el numero de creditos

  //Volver pantalla anterior
  regresarInformacionBeca(){
    this.cicloService.clearSelectedCiclo();
    this.router.navigate(['/informacion']);
  }

}
