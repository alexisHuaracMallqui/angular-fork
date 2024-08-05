import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioBecasService {

  formData: any = {};

  constructor() { }

  setFormData(data: any) {
    this.formData = { ...this.formData, ...data };
  }

  getFormData() {
    return this.formData;
  }

  clearFormData() {
    this.formData = {};
  }
}
