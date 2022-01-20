import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetGeneralComponent } from './pet-general.component';

describe('PetGeneralComponent', () => {
  let component: PetGeneralComponent;
  let fixture: ComponentFixture<PetGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
