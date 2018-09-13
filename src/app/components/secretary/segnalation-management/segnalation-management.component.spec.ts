import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegnalationManagementComponent } from './segnalation-management.component';

describe('SegnalationManagementComponent', () => {
  let component: SegnalationManagementComponent;
  let fixture: ComponentFixture<SegnalationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegnalationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegnalationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
