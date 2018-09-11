import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorManagementComponent } from './professor-management.component';

describe('ProfessorManagementComponent', () => {
  let component: ProfessorManagementComponent;
  let fixture: ComponentFixture<ProfessorManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
