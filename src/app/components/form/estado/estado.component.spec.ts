import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoComponent } from './estado.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { EstadoService } from '../../../services/estado.service';

describe('EstadoComponent', () => {
  let component: EstadoComponent;
  let fixture: ComponentFixture<EstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoComponent],
      imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
      providers: [EstadoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      'estado': new FormControl('', Validators.required)
    })
    component.name = 'estado';
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    })
  });
});
