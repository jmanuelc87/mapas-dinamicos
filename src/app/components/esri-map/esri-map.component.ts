import esri = __esri;
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { loadModules } from "esri-loader";

@Component({
    selector: 'app-esri-map',
    templateUrl: './esri-map.component.html',
    styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

    @ViewChild('mapViewNode')
    private mapViewEl: ElementRef;

    constructor() { }

    ngOnInit() {
        console.log('start map');

        loadModules([
            'esri/Map',
            'esri/views/MapView'
        ]).then(([EsriMap, EsriMapView]) => {
            const map: esri.Map = new EsriMap({
                basemap: 'hybrid'
            });

            const mapView = new EsriMapView({
                container: this.mapViewEl.nativeElement,
                center: [0.1278, 51.5074],
                map: map,
                zoom: 15,
            });
        }).catch(err => console.error(err))
    }

}
