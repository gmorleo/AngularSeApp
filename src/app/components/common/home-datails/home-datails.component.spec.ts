import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDatailsComponent } from './home-datails.component';

describe('HomeDatailsComponent', () => {
  let component: HomeDatailsComponent;
  let fixture: ComponentFixture<HomeDatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
