import { TestBed } from '@angular/core/testing';

import { ContentCreatorService } from './content-creator.service';

describe('ContentCreatorService', () => {
  let service: ContentCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
