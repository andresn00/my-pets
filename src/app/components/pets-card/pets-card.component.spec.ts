import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsCardComponent } from './pets-card.component';

describe('PetsCardComponent', () => {
  let component: PetsCardComponent;
  let fixture: ComponentFixture<PetsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
