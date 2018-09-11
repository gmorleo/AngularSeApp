import { TestBed, inject } from '@angular/core/testing';

import { SegnalationRestService } from './segnalation-rest.service';

describe('SegnalationRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegnalationRestService]
    });
  });

  it('should be created', inject([SegnalationRestService], (service: SegnalationRestService) => {
    expect(service).toBeTruthy();
  }));
});
