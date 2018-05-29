import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { loadModules } from "esri-loader";

@Component({
    selector: 'app-esri-map',
    templateUrl: './esri-map.component.html',
    styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

    private _basemap: string = 'hybrid';
    private _center: Array<number> = [-99.133209, 19.432608];
    private _zoom: number = 4;
    private _extent: any = {
        xmin: -1.3181079254E7,
        ymin: 1635334.4664000012,
        xmax: -9652558.1611,
        ymax: 3858021.4844999984,
        spatialReference: {
            wkid: 102100
        }
    };

    @ViewChild('mapViewNode')
    private mapViewEl: ElementRef;

    @Output()
    private mapLoaded: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log('start map');

        loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Extent',
        ]).then(([EsriMap, EsriMapView, Extent]) => {
            const map = new EsriMap({
                basemap: 'hybrid'
            });

            const mapView = new EsriMapView({
                container: this.mapViewEl.nativeElement,
                center: this._extent,
                map: map,
                zoom: this._zoom,
            });

            mapView.extent = new Extent(this._extent);

            mapView.when(() => {
                this.mapLoaded.emit();
            }, err => console.error(err));

        }).catch(err => console.error(err))
    }

    @Input()
    set basemap(basemap: string) {
        this._basemap = basemap;
    }

    get basemap(): string {
        return this._basemap;
    }

    @Input()
    set center(center: Array<number>) {
        this._center = center;
    }

    get center(): Array<number> {
        return this._center;
    }

    @Input()
    set zoom(zoom: number) {
        this._zoom = zoom;
    }

    get zoom(): number {
        return this._zoom;
    }

    @Input()
    set extent(extent: any) {
        this._extent = extent;
    }

    get extent(): any {
        return this._extent;
    }
}
