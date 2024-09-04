import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { Ciclo } from '../../modelos/ciclo';
import { CicloService } from '../../servicios/ciclo/ciclo.service';
import { Curso } from '../../modelos/curso';
import { CursoService } from '../../servicios/curso/curso.service';

@Component({
  selector: 'app-editar-ciclo-academico',
  templateUrl: './editar-ciclo-academico.component.html',
  styleUrl: './editar-ciclo-academico.component.css'
})
export class EditarCicloAcademicoComponent implements OnInit {

  solicitud: any;
  selectedCiclo: Ciclo | null = null;
  listCursos: Array<Curso> = [];

  constructor(
    private solicitudService: SolicitudService,
    private cicloService: CicloService,
    private cursoService: CursoService,
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
        }
      }
    })
  }

}
