import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { EsriProviderService } from './esri-provider.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EsriMapService {

    private map: __esri.Map;

    private mapview: __esri.MapView;

    public query;

    public mapLoaded: EventEmitter<void> = new EventEmitter()

    public popupSubject: Subject<any> = new Subject();

    private moveToExtent: (extent: __esri.ExtentProperties) => void;

    private changeBasemap: (basemap) => void;

    private showRegionsMap: (regions, color) => void;

    public showLimitsMap: (regions) => void;

    private showPopup: (container) => void;

    private showRanges: (regions, classBreaks) => void;

    public changeZoom: (qty: number) => void;

    constructor(
        private esriProvider: EsriProviderService,
    ) { }

    loadMap(basemap: string, center: Array<number>, zoom: number, extent: any, el: ElementRef) {
        return this.esriProvider.require([
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Extent',
            'esri/widgets/Popup',
            'esri/geometry/geometryEngine',
            'esri/geometry/Point',
        ]).then(
            ([EsriMap, EsriMapView, EsriExtent, Popup, geometryEngine, Point]:
                [__esri.MapConstructor, __esri.MapViewConstructor, __esri.ExtentConstructor, __esri.PopupConstructor, __esri.geometryEngine, __esri.PointConstructor]) => {

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

                this.changeZoom = (qty: number) => {
                    this.mapview.zoom += qty;
                }

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

                this.showRanges = (regions, classBreaks) => {
                    for (let i = 0; i < regions.length; i++) {
                        let item = regions[i];
                        let classBreak = classBreaks[i]

                        let symbol = {
                            type: 'simple-fill',
                            color: classBreak,
                            style: 'solid',
                            outline: {
                                color: 'black',
                                width: '1px',
                                style: 'solid'
                            }
                        };

                        item.symbol = symbol;
                    }

                    this.mapview.graphics.addMany(regions);
                }

                this.showLimitsMap = (region) => {
                    let item = region[0];

                    //let item = Object.assign({}, region[0]);

                    console.log(region);

                    let symbol = {
                        type: 'simple-line',
                        color: 'red',
                        style: 'solid',
                        outline: {
                            color: 'black',
                            width: '1px',
                            style: 'solid'
                        }
                    };

                    item.symbol = symbol;

                    this.mapview.graphics.add(item);
                }

                this.mapview.when(() => {
                    this.mapview.on('pointer-move', (event) => {
                        event.stopPropagation();

                        if (this.mapview.graphics.length > 0) {
                            let count = this.mapview.graphics.length;
                            this.mapview.graphics.forEach((graphic) => {
                                let point = this.mapview.toMap(new Point({
                                    x: event.x,
                                    y: event.y,
                                }));

                                if (geometryEngine.distance(point, graphic.geometry, 'meters') == 0) {
                                    count -= 1;
                                    // show popup
                                    this.popupSubject.next({
                                        x: event.x,
                                        y: event.y,
                                        show: true,
                                        graphic: graphic,
                                    });

                                    return;
                                }

                                if (count == this.mapview.graphics.length) {
                                    // hide popup
                                    this.popupSubject.next({
                                        x: 0,
                                        y: 0,
                                        show: false,
                                    });
                                }
                            });
                        }
                    });
                }, err => console.error(err));


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

    public showPopupOnMap(container) {
        this.showPopup(container);
    }

    public showRangesOnMap(regions, classBreaks) {
        this.showRanges(regions, classBreaks)
    }

}
