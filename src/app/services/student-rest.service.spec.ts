import { TestBed, inject } from '@angular/core/testing';

import { StudentRestService } from './student-rest.service';

describe('StudentRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentRestService]
    });
  });

  it('should be created', inject([StudentRestService], (service: StudentRestService) => {
    expect(service).toBeTruthy();
  }));
});
