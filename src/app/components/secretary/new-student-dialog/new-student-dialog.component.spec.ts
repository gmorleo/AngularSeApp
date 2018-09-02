import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentDialogComponent } from './new-student-dialog.component';

describe('NewStudentDialogComponent', () => {
  let component: NewStudentDialogComponent;
  let fixture: ComponentFixture<NewStudentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStudentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
