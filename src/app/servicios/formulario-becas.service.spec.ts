import { TestBed } from '@angular/core/testing';

import { FormularioBecasService } from './formulario-becas.service';

describe('FormularioBecasService', () => {
  let service: FormularioBecasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioBecasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
