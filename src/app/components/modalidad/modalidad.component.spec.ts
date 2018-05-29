import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadComponent } from './modalidad.component';

describe('ModalidadComponent', () => {
  let component: ModalidadComponent;
  let fixture: ComponentFixture<ModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
