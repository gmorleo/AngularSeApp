import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfessorDialogComponent } from './new-professor-dialog.component';

describe('NewProfessorDialogComponent', () => {
  let component: NewProfessorDialogComponent;
  let fixture: ComponentFixture<NewProfessorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProfessorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
