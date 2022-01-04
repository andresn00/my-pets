import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOwnerDialogComponent } from './signup-owner-dialog.component';

describe('SignupOwnerDialogComponent', () => {
  let component: SignupOwnerDialogComponent;
  let fixture: ComponentFixture<SignupOwnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOwnerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOwnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
