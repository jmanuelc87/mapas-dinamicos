import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoComponent } from './distrito.component';

describe('DistritoComponent', () => {
  let component: DistritoComponent;
  let fixture: ComponentFixture<DistritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
