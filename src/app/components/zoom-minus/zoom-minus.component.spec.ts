import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomMinusComponent } from './zoom-minus.component';

describe('ZoomMinusComponent', () => {
  let component: ZoomMinusComponent;
  let fixture: ComponentFixture<ZoomMinusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomMinusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
