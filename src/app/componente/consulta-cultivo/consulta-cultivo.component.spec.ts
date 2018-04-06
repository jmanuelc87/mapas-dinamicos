import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCultivoComponent } from './consulta-cultivo.component';

describe('ConsultaCultivoComponent', () => {
  let component: ConsultaCultivoComponent;
  let fixture: ComponentFixture<ConsultaCultivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaCultivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
