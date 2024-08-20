import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { SolicitudService } from '../../servicios/solicitud/solicitud.service';

@Component({
  selector: 'app-detalle-academico',
  templateUrl: './detalle-academico.component.html',
  styleUrl: './detalle-academico.component.css'
})


export class DetalleAcademicoComponent implements OnInit{

solicitud: any;

isChecked: boolean = false; 

constructor(
  private router:Router,
  private authService: AuthService,
  private solicitudService : SolicitudService
) {}

ngOnInit(): void {
  this.solicitud = this.solicitudService.getSolicitudData();
  if(this.solicitud.contratoBecario == '0' ) {
    this.showModal(); 
  }
}

showModal() {
  // Wait for the DOM to be ready
  setTimeout(() => {
    // Ensure the global `window` object has access to Bootstrap's modal
    const modalElement = document.getElementById('contrato_becario');
    if (modalElement && (window as any).bootstrap) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show(); // Show the modal automatically
    }
  }, 0);
}

  // Method to update checkbox status
  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
  }
  
  onNavigateInfo(){
    this.router.navigate(['informacion'])
  }

  logout() {
    this.authService.logout()
  }

  aceptarContrato(solicitudData: any){
    solicitudData.contratoBecario = '1';
    console.log(solicitudData);
    this.solicitudService.updateSolicitud(solicitudData).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    })
  }

}
