import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVetDialogComponent } from './edit-vet-dialog.component';

describe('EditVetDialogComponent', () => {
  let component: EditVetDialogComponent;
  let fixture: ComponentFixture<EditVetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
