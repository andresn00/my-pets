import { TestBed } from '@angular/core/testing';

import { PetPageService } from './pet-page.service';

describe('PetPageService', () => {
  let service: PetPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
