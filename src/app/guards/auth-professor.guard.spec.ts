import { TestBed, async, inject } from '@angular/core/testing';

import { AuthProfessorGuard } from './auth-professor.guard';

describe('AuthProfessorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthProfessorGuard]
    });
  });

  it('should ...', inject([AuthProfessorGuard], (guard: AuthProfessorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
