import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { EsriExtentService } from '../../services/esri-extent.service';
import { EsriMapService } from '../../services/esri-map.service';
import { GeometryService } from '../../services/geometry.service';
import { PopupService } from '../../services/popup.service';

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
        ymax: 3558021.4844999984,
        spatialReference: {
            wkid: 102100
        }
    };
    private panRequestSubscription: any;

    private drawRequestSubscription: any;

    private cleanRequestSubscription: any;

    private drawLimitsSubscription: any;

    @ViewChild('mapViewNode')
    private mapViewEl: ElementRef;

    //@ViewChild('popup')
    //private popupComponent: ElementRef;

    constructor(
        private extentService: EsriExtentService,
        private geometryService: GeometryService,
        private mapService: EsriMapService,
        private popupService: PopupService,
    ) { }

    ngOnInit() {
        this.panRequestSubscription = this.extentService.extentRequest.subscribe((value) => {
            this.moveToExtent(value);
        });

        this.drawRequestSubscription = this.geometryService.drawOn.subscribe(value => {
            this.popupService.addConsultaParameters(value.query);
            this.drawOnMap(value.geometries, value.color);
        });

        this.cleanRequestSubscription = this.geometryService.clean.subscribe(value => {
            this.mapService.cleanMap();
        });

        this.drawLimitsSubscription = this.geometryService.drawLimitsOn.subscribe(value => {
            console.log(value.features);
            this.mapService.showLimitsMap(value.features);
        });

        this.loadMap();
    }

    loadMap() {
        let promise: Promise<any> = this.mapService.loadMap(this._basemap, this._center, this._zoom, this._extent, this.mapViewEl);
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
