import { TestBed, inject } from '@angular/core/testing';

import { LessonRestService } from './lesson-rest.service';

describe('LessonRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonRestService]
    });
  });

  it('should be created', inject([LessonRestService], (service: LessonRestService) => {
    expect(service).toBeTruthy();
  }));
});
