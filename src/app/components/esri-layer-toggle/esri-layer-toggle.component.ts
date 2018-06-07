import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from "uuid";
import { EsriMapService } from '../../services/esri-map.service';


@Component({
    selector: 'app-esri-layer-toggle',
    templateUrl: './esri-layer-toggle.component.html',
    styleUrls: ['./esri-layer-toggle.component.css']
})
export class EsriLayerToggleComponent implements OnInit {

    private id: any;

    private position = 'top-right';

    private basemaps: Array<string> = [
         'topo', 'streets', 'satellite',
    ]

    constructor(
        private mapService: EsriMapService
    ) { }

    ngOnInit() {
        this.id = uuid();
    }

    onChangeBaseMap(event) {
        this.mapService.changeBaseMap(event.target.value);
    }

}
