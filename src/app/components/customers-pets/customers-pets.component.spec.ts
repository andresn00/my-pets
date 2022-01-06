import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersPetsComponent } from './customers-pets.component';

describe('CustomersPetsComponent', () => {
  let component: CustomersPetsComponent;
  let fixture: ComponentFixture<CustomersPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
