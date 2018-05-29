import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnioComponent } from './anio.component';

describe('AnioComponent', () => {
  let component: AnioComponent;
  let fixture: ComponentFixture<AnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
