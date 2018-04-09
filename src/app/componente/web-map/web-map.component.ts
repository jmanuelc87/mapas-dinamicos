import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WebmapService } from '../../servicio/webmap.service';

import * as WebMap from 'esri/WebMap';
import * as MapView from 'esri/views/MapView';
import * as Extent from "esri/geometry/Extent";
import * as GraphicsLayer from 'esri/layers/GraphicsLayer';

@Component({
    selector: 'app-webmap',
    templateUrl: './web-map.component.html',
    styleUrls: ['./web-map.component.css'],
    providers: [
        WebmapService
    ]
})
export class WebMapComponent implements OnInit {

    @ViewChild('webmap')
    private mapViewEl: ElementRef;

    constructor(
        private service: WebmapService
    ) { }

    ngOnInit() {

        const layer01 = new GraphicsLayer();

        const map = new WebMap({
            basemap: 'satellite',
            layers: [layer01]
        });

        const view = new MapView({
            map: map,
            container: this.mapViewEl.nativeElement
        });

        view.on('layerview-create', event => {
            this.service.getEntidadesExtent().subscribe(event => {
                view.extent = new Extent(event);
            });

            this.service.getAllEntidadesGeometry().subscribe(features => {
                features.forEach(item => {
                    item.symbol = {
                        type: 'simple-fill',
                        color: [250, 250, 210, 0.3],
                        style: 'solid',
                        outline: {
                            color: 'black',
                            width: 1
                        }
                    };

                    layer01.add(item);
                });
            });
        });
    }
}
