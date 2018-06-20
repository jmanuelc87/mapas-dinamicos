import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEstadoComponent } from './produccion-estado.component';

describe('ProduccionEstadoComponent', () => {
  let component: ProduccionEstadoComponent;
  let fixture: ComponentFixture<ProduccionEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduccionEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
