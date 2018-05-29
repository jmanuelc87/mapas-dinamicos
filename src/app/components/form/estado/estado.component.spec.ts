import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoComponent } from './estado.component';

describe('EstadoComponent', () => {
  let component: EstadoComponent;
  let fixture: ComponentFixture<EstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
