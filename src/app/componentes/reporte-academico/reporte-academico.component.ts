import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var bootstrap: any; 

@Component({
  selector: 'app-reporte-academico',
  templateUrl: './reporte-academico.component.html',
  styleUrl: './reporte-academico.component.css'
})
export class ReporteAcademicoComponent implements OnInit{


  ngOnInit(): void {
    this.initializePopovers();

  }

  private initializePopovers(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map((popoverTriggerEl: Element) => {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

}
