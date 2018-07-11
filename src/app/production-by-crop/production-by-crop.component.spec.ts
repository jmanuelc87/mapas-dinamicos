import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionByCropComponent } from './production-by-crop.component';

describe('ProductionByCropComponent', () => {
  let component: ProductionByCropComponent;
  let fixture: ComponentFixture<ProductionByCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionByCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionByCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
