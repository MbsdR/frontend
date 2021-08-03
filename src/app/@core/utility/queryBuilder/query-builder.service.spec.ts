import { TestBed } from '@angular/core/testing';

import { QueryBuilder } from './query-builder';

describe('QueryBuilderService', () => {
  let service: QueryBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
