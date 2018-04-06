import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstadoComponent } from './consulta-estado.component';

describe('ConsultaEstadoComponent', () => {
  let component: ConsultaEstadoComponent;
  let fixture: ComponentFixture<ConsultaEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
