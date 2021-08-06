import { TestBed } from '@angular/core/testing';

import { UserMockUpService } from './user-mock-up.service';

describe('UserMochUpService', () => {
  let service: UserMockUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMockUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
