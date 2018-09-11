import { TestBed, inject } from '@angular/core/testing';

import { MaterialRestService } from './material-rest.service';

describe('MaterialRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialRestService]
    });
  });

  it('should be created', inject([MaterialRestService], (service: MaterialRestService) => {
    expect(service).toBeTruthy();
  }));
});
