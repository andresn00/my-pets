import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPendingApptsTableComponent } from './pet-pending-appts-table.component';

describe('PetPendingApptsTableComponent', () => {
  let component: PetPendingApptsTableComponent;
  let fixture: ComponentFixture<PetPendingApptsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetPendingApptsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPendingApptsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
