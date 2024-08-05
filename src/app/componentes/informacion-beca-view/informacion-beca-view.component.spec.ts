import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionBecaViewComponent } from './informacion-beca-view.component';

describe('InformacionBecaViewComponent', () => {
  let component: InformacionBecaViewComponent;
  let fixture: ComponentFixture<InformacionBecaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionBecaViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionBecaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
