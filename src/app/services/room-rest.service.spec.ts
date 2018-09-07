import { TestBed, inject } from '@angular/core/testing';

import { RoomRestService } from './room-rest.service';

describe('RoomRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomRestService]
    });
  });

  it('should be created', inject([RoomRestService], (service: RoomRestService) => {
    expect(service).toBeTruthy();
  }));
});
