import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOptionsComponent } from './signup-options.component';

describe('SignupOptionsComponent', () => {
  let component: SignupOptionsComponent;
  let fixture: ComponentFixture<SignupOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
