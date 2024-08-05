import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormFinalComponent } from './register-form-final.component';

describe('RegisterFormFinalComponent', () => {
  let component: RegisterFormFinalComponent;
  let fixture: ComponentFixture<RegisterFormFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFormFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
