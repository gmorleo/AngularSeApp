import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegnalationDialogComponent } from './segnalation-dialog.component';

describe('SegnalationDialogComponent', () => {
  let component: SegnalationDialogComponent;
  let fixture: ComponentFixture<SegnalationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegnalationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegnalationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
