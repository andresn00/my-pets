import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetActionsComponent } from './pet-actions.component';

describe('PetActionsComponent', () => {
  let component: PetActionsComponent;
  let fixture: ComponentFixture<PetActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
