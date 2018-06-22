import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangosComponent } from './rangos.component';

describe('RangosComponent', () => {
  let component: RangosComponent;
  let fixture: ComponentFixture<RangosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
