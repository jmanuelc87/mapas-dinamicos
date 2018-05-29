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
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    })
  });

  it('should have the correct form values', () => {
    fixture.whenStable().then(() => {
      const id = component.id;
      const cicloComponent: HTMLElement = fixture.nativeElement;
      let input = cicloComponent.querySelector(`input`);

      for (let el in input) {
        switch (el) {
          case '0':
            expect(input[el].getAttribute('value')).toBe('1');
            break;

          case '1':
            expect(input[el].getAttribute('value')).toBe('2');
            break;

          case '2':
            expect(input[el].getAttribute('value')).toBe('3');
            break;

          case '3':
            expect(input[el].getAttribute('value')).toBe('4');
            break;

          case '4':
            expect(input[el].getAttribute('value')).toBe('5');
            break;
        }
      }

    })
  });
});
