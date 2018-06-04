import { Injectable, ElementRef } from '@angular/core';
import { EsriProviderService } from './esri-provider.service';

@Injectable({
    providedIn: 'root'
})
export class EsriMapService {

    private map: __esri.Map;

    private mapview: __esri.MapView;

    public moveToExtent: () => void;

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

        });
    }


}
