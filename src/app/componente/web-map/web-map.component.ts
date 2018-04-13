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

    private layerEntidades = new GraphicsLayer();

    private layerDistritos = new GraphicsLayer();

    private layerMunicipios = new GraphicsLayer();


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
                            color: [139, 0, 0, 1.0],
                            width: '1px'
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

            service.then(value => {
                this.addLayer(this.layerEntidades);
                this.addLayer(this.layerDistritos);
                this.addLayer(this.layerMunicipios);
            })
        });

    }

    public setExtent(extent) {
        this.view.extent = extent;
        this.view.goTo(extent);
    }

    /*public fetchForExtent(territorio: Territorio) {
        if (territorio.tipo === 'estado') {
            //this.service.getEntidadExtent(territorio.id_ent).then(value => this.setExtent(value.extent));
        } else if (territorio.tipo === 'distrito') {
            //this.service.getDistritoExtent(territorio.id_ddr).then(value => this.setExtent(value.extent));
        }
    }*/

    /*public drawLineOnMap(territorio: Territorio) {
        if (territorio.tipo === 'estado') {
            this.service.getEntidadGeometry(territorio.id_ent).then(value => {
                this.layerEntidades.removeAll();
                let features = value.features;

                features.forEach(item => {
                    let cloned = item.clone();
                    cloned.symbol = {
                        type: 'simple-line',
                        color: 'black',
                        width: '2px',
                        style: 'dash'
                    };
                    this.layerEntidades.add(cloned);
                });
            });
        } else if (territorio.tipo === 'distrito') {
            this.service.getDistritoGeometry(territorio.id_ddr).then(value => {
                this.layerDistritos.removeAll();
                let features = value.features;

                features.forEach(item => {
                    let cloned = item.clone();
                    cloned.symbol = {
                        type: 'simple-fill',
                        color: 'black',
                        style: 'backward-diagonal'
                    }

                    this.layerDistritos.add(cloned);
                });
            });
        } else if (territorio.tipo === 'municipio') {

            this.service.getMunicipioGeometry(territorio.id_ent, territorio.id_mun).then(value => {
                this.layerMunicipios.removeAll();
                let features = value.features;

                features.forEach(item => {
                    let cloned = item.clone();
                    cloned.symbol = {
                        type: 'simple-fill',
                        color: 'black',
                        style: 'diagonal-cross',
                        outline: {
                            color: 'red',
                            width: '2px',
                            style: 'dash'
                        }
                    };
                    this.layerMunicipios.add(cloned);
                });
            });
        }
    }*/

    public addLayer(layer: Layer) {
        this.map.add(layer);
    }

}
