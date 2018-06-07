import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsriLayerToggleComponent } from './esri-layer-toggle.component';

describe('EsriLayerToggleComponent', () => {
  let component: EsriLayerToggleComponent;
  let fixture: ComponentFixture<EsriLayerToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsriLayerToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriLayerToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
