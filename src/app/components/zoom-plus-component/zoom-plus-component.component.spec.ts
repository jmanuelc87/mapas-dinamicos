import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomPlusComponentComponent } from './zoom-plus-component.component';

describe('ZoomPlusComponentComponent', () => {
  let component: ZoomPlusComponentComponent;
  let fixture: ComponentFixture<ZoomPlusComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomPlusComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomPlusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
