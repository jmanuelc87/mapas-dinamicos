import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { EsriMapComponent } from '../esri-map/esri-map.component';
import { EsriLayerToggleComponent } from '../esri-layer-toggle/esri-layer-toggle.component';
import { LegendComponent } from '../legend/legend.component';
import { InfoComponent } from '../info/info.component';
import { PopupComponent } from '../popup/popup.component';
import { EsriWidgetDirective } from '../../directives/esri-widget.directive';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent, EsriMapComponent, EsriLayerToggleComponent, LegendComponent, InfoComponent, PopupComponent, EsriWidgetDirective],
            imports: [HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
