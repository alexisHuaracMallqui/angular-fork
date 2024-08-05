import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAcademicoComponent } from './detalle-academico.component';

describe('DetalleAcademicoComponent', () => {
  let component: DetalleAcademicoComponent;
  let fixture: ComponentFixture<DetalleAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAcademicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
