import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloComponent } from './ciclo.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

describe('CicloComponent', () => {
  let component: CicloComponent;
  let fixture: ComponentFixture<CicloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CicloComponent],
      imports: [ReactiveFormsModule],
      providers: [],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      'ciclo': new FormControl('', Validators.required)
    });
    component.name = 'ciclo';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
