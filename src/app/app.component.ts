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

    @ViewChild(ProduccionCultivoLateralDirective)
    private lateralDirective: ProduccionCultivoLateralDirective;

    constructor() { }

    ngOnInit(): void {
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
