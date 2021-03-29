import { TestBed } from '@angular/core/testing';

import { PostdetailsService } from './postdetails.service';

describe('PostdetailsService', () => {
  let service: PostdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
