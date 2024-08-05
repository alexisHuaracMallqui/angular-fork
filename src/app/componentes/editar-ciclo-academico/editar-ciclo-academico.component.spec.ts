import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCicloAcademicoComponent } from './editar-ciclo-academico.component';

describe('EditarCicloAcademicoComponent', () => {
  let component: EditarCicloAcademicoComponent;
  let fixture: ComponentFixture<EditarCicloAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCicloAcademicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCicloAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
