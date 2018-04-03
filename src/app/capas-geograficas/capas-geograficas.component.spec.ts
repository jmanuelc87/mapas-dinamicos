import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapasGeograficasComponent } from './capas-geograficas.component';

describe('CapasGeograficasComponent', () => {
  let component: CapasGeograficasComponent;
  let fixture: ComponentFixture<CapasGeograficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapasGeograficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapasGeograficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
