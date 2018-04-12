import * as Extent from 'esri/geometry/Extent';
import * as GraphicsLayer from 'esri/layers/GraphicsLayer';
import * as Layer from 'esri/layers/Layer';
import * as MapImageLayer from 'esri/layers/MapImageLayer';
import * as MapView from 'esri/views/MapView';
import * as TextSymbol from 'esri/symbols/TextSymbol';
import * as WebMap from 'esri/WebMap';
import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { Territorio } from '../../dominio/territorio';
import { WebmapService } from '../../servicio/webmap.service';


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

            this.service.getEntidadesExtent().then(value => {
                this.setExtent(value.extent);

            });
        });

        this.view.when(event => {
            let layer01 = new GraphicsLayer();
            let service = this.service.getAllEntidadesGeometry()

            service.then(value => {
                let features = value.features;

                features.forEach(item => {
                    let cloned = item.clone();
                    cloned.symbol = {
                        type: 'simple-fill',
                        color: [250, 250, 210, 0.3],
                        style: 'solid',
                        outline: {
                            color: 'black',
                            width: 0.5
                        }
                    };

                    layer01.add(cloned);
                });

                this.addLayer(layer01);
            });


            service.then(value => {
                let layer02 = new GraphicsLayer();
                let features = value.features;

                features.forEach(item => {
                    let cloned = item.clone();
                    cloned.symbol = {
                        type: 'text',
                        color: 'black',
                        haloColor: 'white',
                        haloSize: '2px',
                        text: item.attributes['NOM_ENT'],
                        font: {
                            size: 8,
                            family: 'sans-serif'
                        }
                    };

                    layer02.add(cloned);
                });
                this.addLayer(layer02);

                this.mask = false;
            });
        });
    }

    public setExtent(extent) {
        console.log(extent);
        this.view.extent = extent;
        this.view.goTo(extent);
    }

    public fetchForExtent(territorio: Territorio) {
        if (territorio.tipo === 'estado') {
            console.log('en estado...');
            this.service.getEntidadExtent(territorio.id).then(value => {
                console.log(value);
                this.setExtent(value.extent)
            });
        } else if (territorio.tipo === 'distrito') {
            this.service.getDistritoExtent(territorio.id).then(value => this.setExtent(value.extent));
        } else if (territorio.tipo === 'municipio') {
            this.service.getMunicipioExtent(territorio.id).then(value => this.setExtent(value.extent));
        }
    }

    public addLayer(layer: Layer) {
        this.map.add(layer);
    }
}
