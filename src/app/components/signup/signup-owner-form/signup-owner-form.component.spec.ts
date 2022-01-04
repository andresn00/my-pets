import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOwnerFormComponent } from './signup-owner-form.component';

describe('SignupOwnerFormComponent', () => {
  let component: SignupOwnerFormComponent;
  let fixture: ComponentFixture<SignupOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOwnerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
