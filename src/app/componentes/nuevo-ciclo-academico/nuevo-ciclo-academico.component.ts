import { Component, OnInit } from '@angular/core';
import { CicloMalla } from '../../modelos/ciclo-malla';
import { CursoMalla } from '../../modelos/curso-malla';
import { MallaCurricularService } from '../../servicios/malla-curricular/malla-curricular.service';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';

@Component({
  selector: 'app-nuevo-ciclo-academico',
  templateUrl: './nuevo-ciclo-academico.component.html',
  styleUrl: './nuevo-ciclo-academico.component.css',
})
export class NuevoCicloAcademicoComponent implements OnInit {
  solicitud: any;
  listCicloMalla: Array<CicloMalla> = [];
  listCurso: Array<CursoMalla> = [];

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
              console.log("Lista");
              console.log(this.listCicloMalla);
            },
            error: (error) => {
              console.error('Error obteniendo ciclos:', error);
            },
          });
      }
    });
  }


  test(){
    console.log(this.listCicloMalla);
    console.log(this.solicitud);
  } 

}

