import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-academico',
  templateUrl: './detalle-academico.component.html',
  styleUrl: './detalle-academico.component.css'
})


export class DetalleAcademicoComponent implements OnInit{

isChecked: boolean = false; 
constructor(private router:Router) {}

ngOnInit(): void {
  this.showModal();
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

}
