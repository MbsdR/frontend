import { TestBed } from '@angular/core/testing';

import { WindparkMockUpService } from './windpark-mock-up.service';

describe('WindparkMockUpService', () => {
  let service: WindparkMockUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindparkMockUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
