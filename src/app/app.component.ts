import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WebMapComponent } from './componente/web-map/web-map.component';
import { TableComponent } from './componente/table/table.component';
import { ConsultaCultivoComponent } from './componente/consulta-cultivo/consulta-cultivo.component';
import { PicoEvent } from 'picoevent';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    constructor(
        private pico: PicoEvent
    ) { }

    ngOnInit(): void {
        this.pico.publish(true, ['show-overlay']);
    }

}
