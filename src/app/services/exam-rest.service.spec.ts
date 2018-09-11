import { TestBed, inject } from '@angular/core/testing';

import { ExamRestService } from './exam-rest.service';

describe('ExamRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamRestService]
    });
  });

  it('should be created', inject([ExamRestService], (service: ExamRestService) => {
    expect(service).toBeTruthy();
  }));
});
