import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMallasCursosComponent } from './editar-mallas-cursos.component';

describe('EditarMallasCursosComponent', () => {
  let component: EditarMallasCursosComponent;
  let fixture: ComponentFixture<EditarMallasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarMallasCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMallasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
