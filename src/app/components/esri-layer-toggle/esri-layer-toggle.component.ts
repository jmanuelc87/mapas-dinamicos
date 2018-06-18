import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
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

    @ViewChild('root')
    root: ElementRef;

    private basemaps: Array<string> = [
        'topo', 'streets', 'satellite',
    ]

    constructor(
        private mapService: EsriMapService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        this.id = uuid();

        setTimeout(() => {
            this.renderer.removeClass(this.root.nativeElement, 'hidden');
        }, 2000);
    }

    onChangeBaseMap(event) {
        this.mapService.changeBaseMap(event.target.value);
    }

}
