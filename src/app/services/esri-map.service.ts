import { Injectable, ElementRef } from '@angular/core';
import { EsriProviderService } from './esri-provider.service';

@Injectable({
    providedIn: 'root'
})
export class EsriMapService {

    private map: __esri.Map;

    private mapview: __esri.MapView;

    private moveToExtent: (extent: __esri.ExtentProperties) => void;

    constructor(
        private esriProvider: EsriProviderService,
    ) { }

    loadMap(basemap: string, center: Array<number>, zoom: number, extent: any, el: ElementRef) {
        return this.esriProvider.require([
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Extent',
        ]).then(([EsriMap, EsriMapView, EsriExtent]: [__esri.MapConstructor, __esri.MapViewConstructor, __esri.ExtentConstructor]) => {

            this.map = new EsriMap({
                basemap: basemap
            });

            this.mapview = new EsriMapView({
                center: center,
                zoom: zoom,
                extent: extent,
                map: this.map,
                container: el.nativeElement
            });

            this.moveToExtent = (extent) => {
                this.mapview.extent = new EsriExtent(extent);
            }

            return {
                map: this.map,
                mapview: this.mapview,
            }
        }).catch(err => console.error(err));
    }


    public moveToExentParams(params) {
        this.moveToExtent(params);
    }

}
