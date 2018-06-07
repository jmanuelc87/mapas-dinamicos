import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { EsriProviderService } from './esri-provider.service';

@Injectable({
    providedIn: 'root'
})
export class EsriMapService {

    private map: __esri.Map;

    private mapview: __esri.MapView;

    public mapLoaded: EventEmitter<void> = new EventEmitter()

    private moveToExtent: (extent: __esri.ExtentProperties) => void;

    private changeBasemap: (basemap) => void;

    private showRegionsMap: (regions, color) => void;

    constructor(
        private esriProvider: EsriProviderService,
    ) { }

    loadMap(basemap: string, center: Array<number>, zoom: number, extent: any, el: ElementRef) {
        return this.esriProvider.require([
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Extent',
            'esri/Graphic',
        ]).then(([EsriMap, EsriMapView, EsriExtent, EsriGraphic]: [__esri.MapConstructor, __esri.MapViewConstructor, __esri.ExtentConstructor, __esri.GraphicConstructor]) => {

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

            this.changeBasemap = (basemap) => {
                this.map.basemap = basemap;
            }

            this.showRegionsMap = (regions, color) => {

                let symbol = {
                    type: 'simple-fill',
                    color: color,
                    style: 'solid',
                    outline: {
                        color: 'black',
                        width: '1px',
                        style: 'solid'
                    }
                };

                for (let item of regions) {
                    item.symbol = symbol;
                }


                this.mapview.graphics.addMany(regions);
            }

            this.mapview.when(() => {
                this.mapLoaded.emit();
            }, err => console.error(err))

            return {
                map: this.map,
                mapview: this.mapview,
            }
        }).catch(err => console.error(err));
    }


    public moveToExentParams(params) {
        this.moveToExtent(params);
    }

    public drawOnMap(params, color) {
        this.showRegionsMap(params, color);
    }

    public addWidget(element: HTMLElement, position: string) {
        this.mapview.ui.add(element, position);
    }

    public changeBaseMap(params) {
        this.changeBasemap(params);
    }

    public cleanMap() {
        this.mapview.graphics.removeAll();
    }

}
