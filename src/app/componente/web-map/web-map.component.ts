import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WebmapService } from '../../servicio/webmap.service';

import * as WebMap from 'esri/WebMap';
import * as MapView from 'esri/views/MapView';
import * as Extent from "esri/geometry/Extent";
import * as Layer from 'esri/layers/Layer';
import * as GraphicsLayer from 'esri/layers/GraphicsLayer';
import * as MapImageLayer from 'esri/layers/MapImageLayer';
import * as TextSymbol from 'esri/symbols/TextSymbol';

@Component({
    selector: 'app-webmap',
    templateUrl: './web-map.component.html',
    styleUrls: ['./web-map.component.css'],
    providers: [
        WebmapService
    ]
})
export class WebMapComponent implements OnInit {

    private map: WebMap;

    private view: MapView;

    private mask: boolean;

    @ViewChild('webmap')
    private mapViewEl: ElementRef;

    constructor(
        private service: WebmapService
    ) { }

    ngOnInit() {

        this.mask = true;

        this.map = new WebMap({
            basemap: 'satellite'
        });

        this.view = new MapView({
            map: this.map,
            container: this.mapViewEl.nativeElement
        });

        this.view.when(event => {
            this.service.getEntidadesExtent().subscribe(event => {
                this.setExtent(new Extent(event));
            });
        });

        this.view.when(event => {
            let layer01 = new GraphicsLayer();
            this.service.getAllEntidadesGeometry().subscribe(response => {
                response.features.forEach(item => {
                    item.symbol = {
                        type: 'simple-fill',
                        color: [250, 250, 210, 0.3],
                        style: 'solid',
                        outline: {
                            color: 'black',
                            width: 0.5
                        }
                    };

                    layer01.add(item);
                });

                this.mask = false;
            });
            this.addLayer(layer01);
        });

        this.view.when(event => {
            let layer02 = new GraphicsLayer();

            this.service.getAllEntidadesGeometry().subscribe(response => {
                response.features.forEach(item => {
                    item.symbol = {
                        type: 'text',
                        color: 'black',
                        haloColor: 'white',
                        haloSize: '1px',
                        text: item.attributes['NOM_ENT'],
                        xoffset: 2,
                        yoffset: 2,
                        font: {
                            size: 7,
                            family: 'sans-serif'
                        }
                    };

                    layer02.add(item);
                });

                this.mask = false;
            });

            this.addLayer(layer02);
        });
    }

    public setExtent(extent: Extent) {
        this.view.extent = extent;
    }

    public addLayer(layer: Layer) {
        this.map.add(layer);
    }
}
