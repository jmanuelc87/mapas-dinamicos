import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionCultivoComponent } from './produccion-cultivo.component';

describe('ProduccionCultivoComponent', () => {
  let component: ProduccionCultivoComponent;
  let fixture: ComponentFixture<ProduccionCultivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduccionCultivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
