import { TestBed } from '@angular/core/testing';

import { ProfileMockUpService } from './profile-mock-up.service';

describe('UserMochUpService', () => {
  let service: ProfileMockUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileMockUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
