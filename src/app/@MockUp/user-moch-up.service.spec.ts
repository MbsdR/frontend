import { TestBed } from '@angular/core/testing';

import { UserMochUpService } from './user-moch-up.service';

describe('UserMochUpService', () => {
  let service: UserMochUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMochUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
