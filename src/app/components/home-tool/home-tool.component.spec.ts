import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToolComponent } from './home-tool.component';

describe('HomeToolComponent', () => {
  let component: HomeToolComponent;
  let fixture: ComponentFixture<HomeToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
