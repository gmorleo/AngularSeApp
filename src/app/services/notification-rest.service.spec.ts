import { TestBed, inject } from '@angular/core/testing';

import { NotificationRestService } from './notification-rest.service';

describe('NotificationRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationRestService]
    });
  });

  it('should be created', inject([NotificationRestService], (service: NotificationRestService) => {
    expect(service).toBeTruthy();
  }));
});
