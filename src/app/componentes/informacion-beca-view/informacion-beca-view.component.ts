import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';

@Component({
  selector: 'app-informacion-beca-view',
  templateUrl: './informacion-beca-view.component.html',
  styleUrl: './informacion-beca-view.component.css'
})
export class InformacionBecaViewComponent implements OnInit{
  solicitud: any;

  constructor (
    private solicitudService: SolicitudService,
  ) {

  }

  ngOnInit(): void {
    this.solicitudService.getSolicitudData().subscribe(data => {
      this.solicitud = data;
    });
  }

}
