import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSegnalationComponent } from './professor-segnalation.component';

describe('ProfessorSegnalationComponent', () => {
  let component: ProfessorSegnalationComponent;
  let fixture: ComponentFixture<ProfessorSegnalationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorSegnalationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSegnalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
