import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsriMapComponent } from './esri-map.component';
import { PopupComponent } from '../popup/popup.component';
import { EsriWidgetDirective } from '../../directives/esri-widget.directive';
import { HttpClientModule } from '@angular/common/http';

describe('EsriMapComponent', () => {
    let component: EsriMapComponent;
    let fixture: ComponentFixture<EsriMapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EsriMapComponent, PopupComponent, EsriWidgetDirective],
            imports: [HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EsriMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
