import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadComponent } from './modalidad.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

describe('ModalidadComponent', () => {
  let component: ModalidadComponent;
  let fixture: ComponentFixture<ModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalidadComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      'modalidad': new FormControl('', Validators.required)
    })
    component.name = 'modalidad'
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    })
  });
});
