import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendComponent } from './legend.component';
import { EsriWidgetDirective } from '../../directives/esri-widget.directive';

describe('LegendComponent', () => {
    let component: LegendComponent;
    let fixture: ComponentFixture<LegendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LegendComponent, EsriWidgetDirective]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
