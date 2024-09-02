import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';
import { MallaCurricularService } from '../../servicios/malla-curricular/malla-curricular.service';
import { CicloService } from '../../servicios/ciclo/ciclo.service';
import { Ciclo } from '../../modelos/ciclo';
import { CicloMalla } from '../../modelos/ciclo-malla';
import { CursoMalla } from '../../modelos/curso-malla';


@Component({
  selector: 'app-informacion-beca-view',
  templateUrl: './informacion-beca-view.component.html',
  styleUrl: './informacion-beca-view.component.css'
})
export class InformacionBecaViewComponent implements OnInit{
  solicitud: any;
  listCiclos: Array<Ciclo> = [];
  listCiclosMalla: Array<CicloMalla> = [];
  listCursosMalla: Array<CursoMalla> = []

  constructor (
    private solicitudService: SolicitudService,
    private mallaService: MallaCurricularService,
    private cicloService: CicloService
  ) {

  }

  ngOnInit(): void {
    this.solicitudService.getSolicitudData().subscribe(data => {
      this.solicitud = data;
      if(this.solicitud){
        this.cicloService.getCiclosBySolicitud(this.solicitud.id).subscribe({
          next: (listCiclo: Array<Ciclo>) => {
            this.listCiclos = listCiclo;
            console.log('test')
            console.log(this.listCiclos)
          }
        })
      }
    });
  }

}
