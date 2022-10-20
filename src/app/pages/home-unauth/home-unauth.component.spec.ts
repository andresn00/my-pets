import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUnauthComponent } from './home-unauth.component';

describe('HomeUnauthComponent', () => {
  let component: HomeUnauthComponent;
  let fixture: ComponentFixture<HomeUnauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUnauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
