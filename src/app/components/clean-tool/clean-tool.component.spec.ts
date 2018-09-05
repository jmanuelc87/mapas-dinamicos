import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanToolComponent } from './clean-tool.component';

describe('CleanToolComponent', () => {
  let component: CleanToolComponent;
  let fixture: ComponentFixture<CleanToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
