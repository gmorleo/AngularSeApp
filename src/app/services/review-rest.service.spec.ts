import { TestBed, inject } from '@angular/core/testing';

import { ReviewRestService } from './review-rest.service';

describe('ReviewRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewRestService]
    });
  });

  it('should be created', inject([ReviewRestService], (service: ReviewRestService) => {
    expect(service).toBeTruthy();
  }));
});
