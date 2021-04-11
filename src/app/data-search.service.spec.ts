import { TestBed } from '@angular/core/testing';

import { DataSearchService } from './data-search.service';

describe('DataSearchService', () => {
  let service: DataSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
