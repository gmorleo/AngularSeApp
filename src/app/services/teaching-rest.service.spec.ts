import { TestBed, inject } from '@angular/core/testing';

import { TeachingRestService } from './teaching-rest.service';

describe('TeachingRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachingRestService]
    });
  });

  it('should be created', inject([TeachingRestService], (service: TeachingRestService) => {
    expect(service).toBeTruthy();
  }));
});
