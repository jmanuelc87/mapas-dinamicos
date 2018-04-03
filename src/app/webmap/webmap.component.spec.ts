import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebmapComponent } from './webmap.component';

describe('WebmapComponent', () => {
  let component: WebmapComponent;
  let fixture: ComponentFixture<WebmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
