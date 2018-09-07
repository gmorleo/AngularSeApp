import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDialogComponent } from './lesson-dialog.component';

describe('LessonDialogComponent', () => {
  let component: LessonDialogComponent;
  let fixture: ComponentFixture<LessonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
