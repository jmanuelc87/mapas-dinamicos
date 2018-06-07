import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { loadModules } from "esri-loader";
import { EsriExtentService } from '../../services/esri-extent.service';
import { EsriMapService } from '../../services/esri-map.service';
import { GeometryService } from '../../services/geometry.service';

@Component({
    selector: 'app-esri-map',
    templateUrl: './esri-map.component.html',
    styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

    private _basemap: string = 'satellite';
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
    private panRequestSubscription: any;

    private drawRequestSubscription: any;

    private cleanRequestSubscription: any;

    @ViewChild('mapViewNode')
    private mapViewEl: ElementRef;

    @Output()
    private mapLoaded: EventEmitter<void> = new EventEmitter();

    constructor(
        private extentService: EsriExtentService,
        private geometryService: GeometryService,
        private mapService: EsriMapService,
    ) { }

    ngOnInit() {

        this.panRequestSubscription = this.extentService.extentRequest.subscribe((value) => {
            this.moveToExtent(value);
        });

        this.drawRequestSubscription = this.geometryService.drawOn.subscribe(value => {
            this.drawOnMap(value.geometries, value.color);
        });

        this.cleanRequestSubscription = this.geometryService.clean.subscribe(value => {
            this.mapService.cleanMap();
        });

        this.loadMap();
    }

    loadMap() {
        let promise: Promise<any> = this.mapService.loadMap(this._basemap, this._center, this._zoom, this._extent, this.mapViewEl);

        promise.then((mapInfo) => {
            let mapView = mapInfo.mapview;
            mapView.when(() => {
                this.mapLoaded.emit();
            }, err => console.error(err));
        });
    }

    public moveToExtent(params) {

        let props: __esri.ExtentProperties = {
            xmin: params.xmin,
            ymin: params.ymin,
            xmax: params.xmax,
            ymax: params.ymax,
            spatialReference: {
                wkid: params.spatialReference.wkid,
            }
        }

        this.mapService.moveToExentParams(props);
        setTimeout(() => {
            this.extentService.complete();
        }, 2000);
    }

    public drawOnMap(params, color) {
        this.mapService.drawOnMap(params, color);
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
}
