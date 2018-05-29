import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioComponent } from './municipio.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { MunicipioService } from '../../../services/municipio.service';

describe('MunicipioComponent', () => {
  let component: MunicipioComponent;
  let fixture: ComponentFixture<MunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipioComponent],
      imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
      providers: [MunicipioService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      'municipio': new FormControl('', Validators.required)
    })
    component.name = 'municipio'
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    })
  });
});
