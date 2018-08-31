import { TestBed, async, inject } from '@angular/core/testing';

import { AuthSecretaryGuard } from './auth-secretary.guard';

describe('AuthSecretaryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSecretaryGuard]
    });
  });

  it('should ...', inject([AuthSecretaryGuard], (guard: AuthSecretaryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
