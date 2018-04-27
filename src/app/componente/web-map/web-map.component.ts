import * as Extent from 'esri/geometry/Extent';
import * as geometryEngine from 'esri/geometry/geometryEngine';
import * as Graphic from 'esri/Graphic';
import * as GraphicsLayer from 'esri/layers/GraphicsLayer';
import * as Layer from 'esri/layers/Layer';
import * as MapView from 'esri/views/MapView';
import * as Query from 'esri/tasks/support/Query';
import * as SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import * as SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import * as TextSymbol from 'esri/symbols/TextSymbol';
import * as WebMap from 'esri/WebMap';
import { Anuario } from '../../dominio/anuario';
import { AnuarioAgricola } from '../../dominio/anuario-agricola';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { Ddr } from '../../dominio/ddr';
import { Estado } from '../../dominio/estado';
import { isUndefined } from 'util';
import { Municipio } from '../../dominio/municipio';
import { Observable } from 'rxjs/Observable';
import { PicoEvent } from 'picoevent';
import { Point } from 'esri/geometry';
import { Server } from 'selenium-webdriver/safari';
import { ServiceUtil } from '../../util/util';
import { Subscription } from 'rxjs/Subscription';
import { Territorio } from '../../dominio/territorio';
import { WebmapService } from '../../servicio/webmap.service';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { Estadistica } from '../../dominio/estadistica';
import { MapOperator } from 'rxjs/operators/map';
import { promise } from 'selenium-webdriver';



@Component({
    selector: 'app-webmap',
    templateUrl: './web-map.component.html',
    styleUrls: ['./web-map.component.css'],
    providers: [
        WebmapService,
        ServiceUtil
    ]
})
export class WebMapComponent implements OnInit, OnDestroy {

    private map: WebMap;

    private view: MapView;

    //private mask: boolean;

    private layerEntidades = new GraphicsLayer();

    private layerDistritos = new GraphicsLayer();

    private layerMunicipios = new GraphicsLayer();

    private layerOutput = new GraphicsLayer();

    private observable: Observable<Point>;

    private features: Graphic[];

    private msg: Map<string, any>;

    private channels: Subscription[] = new Array<Subscription>();

    @ViewChild('webmap')
    private mapViewEl: ElementRef;

    constructor(
        private service: WebmapService,
        private service01: AnuarioAgricolaService,
        private pico: PicoEvent
    ) { }

    ngOnInit() {

        // this.mask = true;

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

                //this.mask = false;
            });

            service.then(value => {
                this.addLayer(this.layerEntidades);
                this.addLayer(this.layerDistritos);
                this.addLayer(this.layerMunicipios);
                this.addLayer(this.layerOutput);
            });


            service.catch(err => console.log(err));
        });


        this.observable = Observable.create(observer => {
            this.view.on('pointer-move', (event) => {
                observer.next(
                    this.view.toMap(new Point({
                        x: event.x,
                        y: event.y
                    }))
                );
            });
        });


        this.observable
            .debounceTime(350)
            .subscribe(value => this.checkPopupOnMap(value));

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
            type: Map,
            targets: ['draw-map-municipio']
        }, msg => this.drawMunicipioOnMap(msg)));

        this.channels.push(this.pico.listen({
            type: Map,
            targets: ['erase-map-municipio']
        }, msg => this.ereaseOnLayers(this.layerMunicipios)));

        this.channels.push(this.pico.listen({
            type: Map,
            targets: ['erase-map-distrito']
        }, msg => this.ereaseOnLayers(this.layerDistritos)));

        this.channels.push(this.pico.listen({
            type: Map,
            targets: ['erase-map-estado']
        }, msg => this.ereaseOnLayers(this.layerEntidades)));

        this.channels.push(this.pico.listen({
            type: Map,
            targets: ['show-query-map-municipios']
        }, msg => this.queryConsultaCultivoOnMap(msg)));

        this.channels.push(this.pico.listen({
            type: Map,
            targets: ['show-query-map-estados']
        }, msg => this.queryConsultaCultivoOnMapByEstados(msg)));
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

    private drawMunicipioOnMap(msg) {
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

        this.service.getGeometryMunicipioByEntidad(msg.get('estado').id, msg.get('municipio').id).then(value =>
            this.buildSymbolLayers(value.features, symbol, this.layerMunicipios));
    }

    private buildSymbolLayers(features: any[], symbol: any, layer: GraphicsLayer) {
        for (let item of features) {
            item.symbol = symbol;
            layer.add(item);
        }
    }

    private queryConsultaCultivoOnMap(msg) {
        // siempre se dibujan los municipios en las consultas
        let estado = msg.get('estado.id');
        let mpios = msg.get('municipios');
        this.msg = msg;

        // convertir objetos a un arreglo de numeros
        let mpiosArray = this.modelToArray(mpios);

        let symbol = {
            type: 'simple-fill',
            color: msg.get('color'),
            style: 'solid',
            outline: {
                color: 'black',
                width: '1px',
                style: 'solid'
            }
        };

        this.service.getGeometryMunicipiosByEntidad(estado, mpiosArray)
            .then(value => {
                this.layerOutput.removeAll();
                this.features = value.features as Graphic[];
                this.buildSymbolLayers(value.features, symbol, this.layerOutput);
            });
    }

    private queryConsultaCultivoOnMapByEstados(msg) {
        // se dibujan los estados/delegaciones en el mapa
        let estado: Territorio[] = msg.get('estados');
        this.msg = msg;
        //let mpios = msg.municipio;

        this.layerOutput.removeAll();

        let estados = this.modelToArray(estado);

        let symbol = {
            type: 'simple-fill',
            color: msg.get('color'),
            style: 'solid',
            outline: {
                color: 'black',
                width: '1px',
                style: 'solid'
            }
        };

        this.service.getGeometryByEntidades(estados)
            .then(value => {
                this.features = value.features as Graphic[];
                this.buildSymbolLayers(value.features, symbol, this.layerOutput)
            });
    }

    private ereaseOnLayers(layer: GraphicsLayer) {
        layer.removeAll();
    }

    public addLayer(layer: Layer) {
        this.map.add(layer);
    }

    private modelToArray(territorio: Territorio[]): number[] {
        let array = [];
        for (let t of territorio) {
            array.push(t.id);
        }
        return array;
    }

    private checkPopupOnMap(value: Point) {
        if (!isUndefined(this.features)) {
            for (let item of this.features) {
                if (geometryEngine.distance(value, item.geometry, 'meters') === 0) {
                    this.showPopupOnMap(this.msg, item, value);

                }
            }
        }

        /*
        this.view.popup.open({
            title: "You clicked here",
            content: "This is a point of interest",
            location: value,
        });
        */
    }

    private showPopupOnMap(msg, item: Graphic, point: Point) {
        let year;
        let ciclo;
        let modalidad;
        let estado;
        let ent;
        let mun;
        let cultivo;

        if (this.msg.get('anuario') instanceof AnuarioAgricola) {
            // obtener propiedades del anuario agricola
            let anuario = (this.msg.get('anuario') as AnuarioAgricola);
            year = anuario.anio;
            ciclo = anuario.ciclo
            modalidad = anuario.modalidad;
            estado = anuario.estado;
            cultivo = this.msg.get('cultivo.id');

            console.log("showPopupOnMap", cultivo);
        }

        let promise;

        if (estado == 0) {
            ent = item.attributes['CVE_ENT'];

            // llamar al servicio por estado
            promise = this.service01
                .getEstadisticaByEstado(year, ciclo, modalidad, Number.parseInt(ent), cultivo)
        } else {

            ent = Number.parseInt(item.attributes['CVE_ENT']);
            mun = Number.parseInt(item.attributes['CVE_MUN']);

            promise = this.service01.getEstadisticaByMunicipio(year, ciclo, modalidad, ent, mun, cultivo);
        }

        // obtener los datos desde el servicio
        if (!isUndefined(promise)) {
            promise.then((value: Estadistica) => {
                this.view.popup.open({
                    title: '<div style="color: whitesmoke;">Estadísticas del Cultivo</div>',
                    content: `
                            <table>
                            <tbody>
                            <tr>
                                <td>Cultivo</td>
                                <td>
                                <strong>
                                ${value.cultivo.nombre}
                                </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Territorio</td>
                                <td>
                                <strong>
                                ${value.territorio.nombre}
                                </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Sup. Sembrada (Ha)</td>
                                <td>
                                <strong>
                                ${value.cultivo.sembrada}
                                </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Sup. Cosechada (Ha)</td>
                                <td>
                                <strong>
                                ${value.cultivo.cosechada}
                                </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Producción (Ton)</td>
                                <td>
                                <strong>
                                ${value.cultivo.produccion}
                                </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Valor (Miles de Pesos)</td>
                                <td>
                                <strong>
                                $${value.cultivo.valor}
                                </strong>
                                </td>
                            </tr>
                            <tbody>
                        </table>
                    `,
                    location: point
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

}