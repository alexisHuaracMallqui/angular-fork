import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormNextComponent } from './register-form-next.component';

describe('RegisterFormNextComponent', () => {
  let component: RegisterFormNextComponent;
  let fixture: ComponentFixture<RegisterFormNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormNextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFormNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
