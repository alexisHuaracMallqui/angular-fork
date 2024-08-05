import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionBecaComponent } from './informacion-beca.component';

describe('InformacionBecaComponent', () => {
  let component: InformacionBecaComponent;
  let fixture: ComponentFixture<InformacionBecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionBecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionBecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
