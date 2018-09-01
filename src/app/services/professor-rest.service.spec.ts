import { TestBed, inject } from '@angular/core/testing';

import { ProfessorRestService } from './professor-rest.service';

describe('ProfessorRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorRestService]
    });
  });

  it('should be created', inject([ProfessorRestService], (service: ProfessorRestService) => {
    expect(service).toBeTruthy();
  }));
});
