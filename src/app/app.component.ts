import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
    } from '@angular/core';
import { ProduccionCultivoComponent } from './produccion-cultivo/produccion-cultivo.component';
import { ProduccionCultivoLateralDirective } from './directives/lateral.directive';
import { ProduccionEstadoComponent } from './produccion-estado/produccion-estado.component';
import { CapasGeograficasComponent } from './capas-geograficas/capas-geograficas.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

    entryComponents: [
        ProduccionCultivoComponent,
        ProduccionEstadoComponent,
        CapasGeograficasComponent
    ]
})
export class AppComponent implements OnInit {

    @ViewChild('map')
    private mapViewEl: ElementRef;

    @ViewChild(ProduccionCultivoLateralDirective)
    private lateralDirective: ProduccionCultivoLateralDirective;

    constructor() { }

    ngOnInit(): void {
        const map: __esri.Map = new Map({
            basemap: 'oceans'
        });

        const view: __esri.MapView = new MapView({
            map: map,
            container: this.mapViewEl.nativeElement,
            center: [-112, 38],
            zoom: 6
        });
    }


    private menuOpen(menuSelected): void {
        if (menuSelected === 'produccion_cultivo') {
            this.lateralDirective.openLateralProduccionCultivoComponent();
        } else if (menuSelected === 'produccion_estado') {
            this.lateralDirective.openLateralProduccionEstadoComponent();
        } else if (menuSelected === 'capas_geograficas') {
            this.lateralDirective.openLateralCapasGeograficas();
        }
    }
}
