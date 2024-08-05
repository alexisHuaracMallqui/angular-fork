import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCicloAcademicoComponent } from './nuevo-ciclo-academico.component';

describe('NuevoCicloAcademicoComponent', () => {
  let component: NuevoCicloAcademicoComponent;
  let fixture: ComponentFixture<NuevoCicloAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoCicloAcademicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoCicloAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
