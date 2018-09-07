import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingManagementComponent } from './teaching-management.component';

describe('TeachingManagementComponent', () => {
  let component: TeachingManagementComponent;
  let fixture: ComponentFixture<TeachingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
