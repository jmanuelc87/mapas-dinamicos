import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WebMapComponent } from './componente/web-map/web-map.component';
import { TableComponent } from './componente/table/table.component';
import { ConsultaCultivoComponent } from './componente/consulta-cultivo/consulta-cultivo.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild(WebMapComponent)
    private webmapViewChildren: WebMapComponent;

    @ViewChild(TableComponent)
    private tableViewChildren: TableComponent;

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit() {

    }

    private onActivate(consultaComponent) {
        if (consultaComponent instanceof ConsultaCultivoComponent) {
            let instance = consultaComponent as ConsultaCultivoComponent;
            instance.getDataEvent.subscribe(data => {
                this.tableViewChildren.setData(data);
            });
        }
    }

    private onDeactivate(consultaComponent) {

    }

}
