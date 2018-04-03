import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import * as MapImageLayer from 'esri/layers/MapImageLayer';
import * as TextSymbol from 'esri/symbols/TextSymbol';

@Component({
    selector: 'app-webmap',
    templateUrl: './webmap.component.html',
    styleUrls: ['./webmap.component.css']
})
export class WebmapComponent implements OnInit, AfterViewInit {

    @ViewChild('webmap')
    private mapViewEl: ElementRef;

    private siapUrl = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        /*const txtsym: __esri.TextSymbolProperties = {
            type: "text",
            color: [255, 255, 255, 0.85],
            font: {
                size: 16,
                weight: "bolder"
            }
        };*/

        const mapLayer: __esri.MapImageLayer = new MapImageLayer({
            url: this.siapUrl,
            sublayers: [
                {
                    id: 6,
                    opacity: 1.0,
                    labelingInfo: [{
                        labelExpression: '[CVE_ENT]',
                        labelPlacement: 'always-horizontal'
                    }]
                }
            ]
        });

        const map: __esri.Map = new Map({
            basemap: 'satellite',
            layers: [mapLayer]
        });

        const view: __esri.MapView = new MapView({
            map: map,
            container: this.mapViewEl.nativeElement,
            center: [-99.133209, 19.432608],
            zoom: 6
        });
    }
}
