import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineDialogComponent } from './vaccine-dialog.component';

describe('VaccineDialogComponent', () => {
  let component: VaccineDialogComponent;
  let fixture: ComponentFixture<VaccineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
