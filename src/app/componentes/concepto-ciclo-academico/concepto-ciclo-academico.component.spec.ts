import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoCicloAcademicoComponent } from './concepto-ciclo-academico.component';

describe('ConceptoCicloAcademicoComponent', () => {
  let component: ConceptoCicloAcademicoComponent;
  let fixture: ComponentFixture<ConceptoCicloAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConceptoCicloAcademicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConceptoCicloAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
