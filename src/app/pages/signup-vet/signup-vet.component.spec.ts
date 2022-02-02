import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVetComponent } from './signup-vet.component';

describe('SignupVetComponent', () => {
  let component: SignupVetComponent;
  let fixture: ComponentFixture<SignupVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
