import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoComponent } from './catalogo.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoComponent],
      imports: [ReactiveFormsModule],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      'catalogo': new FormControl('')
    }, Validators.required)
    component.name = 'catalogo';
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    })
  });

  it('should have the correct input values', () => {
    fixture.whenStable().then(() => {
      const id = component.id
      const catalogoElement: HTMLElement = fixture.nativeElement;
      const input = catalogoElement.querySelector(`input[name='generico-${id}']`);
      console.log(`input[name='generico-${id}']`);
      expect(input.nodeValue).toEqual('generico');
    });
  })
});
