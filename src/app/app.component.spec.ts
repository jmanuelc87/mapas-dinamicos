import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { EsriLayerToggleComponent } from './components/esri-layer-toggle/esri-layer-toggle.component';
import { LegendComponent } from './components/legend/legend.component';
import { InfoComponent } from './components/info/info.component';
import { PopupComponent } from './components/popup/popup.component';
import { EsriWidgetDirective } from './directives/esri-widget.directive';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent, HeaderComponent, DashboardComponent, EsriMapComponent, EsriLayerToggleComponent, LegendComponent, InfoComponent, PopupComponent, EsriWidgetDirective
            ],
            imports: [
                HttpClientModule,
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
