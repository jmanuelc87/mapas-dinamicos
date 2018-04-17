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
    ViewChild,
    OnDestroy
} from '@angular/core';
import { Territorio } from '../../dominio/territorio';
import { WebmapService } from '../../servicio/webmap.service';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs/Subscription';
import { Estado } from '../../dominio/estado';
import { Ddr } from '../../dominio/ddr';
import { Mensaje } from '../../dominio/mensaje';
import { WebmapMensaje } from '../../dominio/webmap-mensaje';
import { Municipio } from '../../dominio/municipio';



@Component({
    selector: 'app-webmap',
    templateUrl: './web-map.component.html',
    styleUrls: ['./web-map.component.css'],
    providers: [
        WebmapService
    ]
})
export class WebMapComponent implements OnInit, OnDestroy {

    private map: WebMap;

    private view: MapView;

    private mask: boolean;

    private layerEntidades = new GraphicsLayer();

    private layerDistritos = new GraphicsLayer();

    private layerMunicipios = new GraphicsLayer();

    private channels: Subscription[] = new Array<Subscription>();

    @ViewChild('webmap')
    private mapViewEl: ElementRef;

    constructor(
        private service: WebmapService,
        private pico: PicoEvent
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

            this.service.getFullExtent().then(value => {
                this.setExtent(value.extent);

            });
        });

        this.view.when(event => {
            let layer01 = new GraphicsLayer();
            let service = this.service.getGeometryEntidadAll();

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

        this.channels.push(this.pico.listen({
            type: Estado,
            targets: ['update-extent-entidades']
        }, msg => this.updateExtentForEntidades(msg)));

        this.channels.push(this.pico.listen({
            type: Estado,
            targets: ['update-extent-all']
        }, msg => this.updateExtentForAll(msg)));

        this.channels.push(this.pico.listen({
            type: Estado,
            targets: ['draw-map-entidad']
        }, msg => this.drawEntidadOnMap(msg)));

        this.channels.push(this.pico.listen({
            type: Ddr,
            targets: ['draw-map-ddr']
        }, msg => this.drawDdrOnMap(msg)));

        this.channels.push(this.pico.listen({
            type: Mensaje,
            targets: ['draw-map-municipio']
        }, msg => this.drawMunicipioOnMap(msg)));

        this.channels.push(this.pico.listen({
            type: Mensaje,
            targets: ['erase-map-municipio']
        }, msg => this.ereaseOnLayers(this.layerMunicipios)));

        this.channels.push(this.pico.listen({
            type: Mensaje,
            targets: ['erase-map-distrito']
        }, msg => this.ereaseOnLayers(this.layerDistritos)));

        this.channels.push(this.pico.listen({
            type: Mensaje,
            targets: ['erase-map-estado']
        }, msg => this.ereaseOnLayers(this.layerEntidades)));


        this.channels.push(this.pico.listen({
            type: WebmapMensaje,
            targets: ['show-query-map']
        }, msg => this.queryConsultaCultivoOnMap(msg)));
    }

    ngOnDestroy(): void {
        for (let channel of this.channels) {
            channel.unsubscribe();
        }
    }

    private setExtent(extent) {
        this.view.extent = extent;
        this.view.goTo(extent);
    }

    /**
     * Actualiza el extent del mapa situando cada uno de los estado
     * 
     * @param msg clase Estado con el id de la entidad
     */
    private updateExtentForEntidades(msg) {
        this.service.getExtentByEntidad(msg.id).then(value => this.setExtent(value.extent));
    }


    private updateExtentForAll(msg) {
        this.service.getFullExtent().then(value => this.setExtent(value.extent));
    }

    private drawEntidadOnMap(msg) {
        this.layerEntidades.removeAll();
        let symbol = {
            type: 'simple-line',
            color: 'black',
            width: '2px',
            style: 'dash'
        };
        this.service.getGeometryEntidad(msg.id).then(value =>
            this.buildSymbolLayers(value.features, symbol, this.layerEntidades));
    }

    private drawDdrOnMap(msg) {
        this.layerDistritos.removeAll();
        let symbol = {
            type: 'simple-fill',
            color: 'black',
            style: 'backward-diagonal'
        };

        this.service.getGeometryDistrito(msg.id).then(value =>
            this.buildSymbolLayers(value.features, symbol, this.layerDistritos));
    }

    private drawMunicipioOnMap(msg: Mensaje) {
        this.layerMunicipios.removeAll();

        let symbol = {
            type: 'simple-fill',
            color: 'black',
            style: 'diagonal-cross',
            outline: {
                color: 'red',
                width: '2px',
                style: 'dash'
            }
        };

        this.service.getGeometryMunicipioByEntidad(msg.entidad.id, msg.municipio.id).then(value =>
            this.buildSymbolLayers(value.features, symbol, this.layerMunicipios));
    }

    private buildSymbolLayers(features: any[], symbol: any, layer: GraphicsLayer) {
        for (let item of features) {
            item.symbol = symbol;
            layer.add(item);
        }
    }

    private queryConsultaCultivoOnMap(msg: WebmapMensaje) {
        // siempre se dibujan los municipios en las consultas
        let estado = msg.estado;
        let mpios = msg.municipio;

        // convertir a arreglos y pintar sobre el mapa
        let mpiosArray = this.modelToArray(mpios);

        this.layerMunicipios.removeAll();

        let symbol = {
            type: 'simple-fill',
            color: 'green',
            style: 'solid',
            outline: {
                color: 'black',
                width: '1px',
                style: 'solid'
            }
        };

        this.service.getGeometryMunicipiosByEntidad(estado.id, mpiosArray).then(value => this.buildSymbolLayers(value.features, symbol, this.layerMunicipios));
    }

    private ereaseOnLayers(layer: GraphicsLayer) {
        layer.removeAll();
    }

    public addLayer(layer: Layer) {
        this.map.add(layer);
    }

    private modelToArray(territorio: Territorio[]) {
        let array = [];
        for (let t of territorio) {
            array.push(t.id);
        }
        return array;
    }

}