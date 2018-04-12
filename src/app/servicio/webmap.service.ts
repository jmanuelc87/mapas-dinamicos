import * as FindParameters from 'esri/tasks/support/FindParameters';
import * as FindTask from 'esri/tasks/FindTask';
import * as Query from 'esri/tasks/support/Query';
import * as QueryTask from 'esri/tasks/QueryTask';
import { Extent } from 'esri/geometry';
import { Injectable } from '@angular/core';
import { Territorio } from '../dominio/territorio';
import { ServiceUtil } from '../util/util';


@Injectable()
export class WebmapService {

    private url = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    constructor() { }

    public getEntidadesExtent(): Promise<Territorio> {

        const queryTask = new QueryTask({
            url: this.url
        });

        const params = new Query({
            outFields: ['*']
        });

        return new Promise<Territorio>((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Territorio(0, null, null, response.fullExtent));
            });
        });
    }


    public getAllEntidadesGeometry(): Promise<Territorio> {
        const queryTask = new QueryTask({
            url: this.url + '/6' // service entidades
        });

        const params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        params.where = ServiceUtil.queryTaskWhere(1, 32);

        return new Promise<Territorio>((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Territorio(0, null, null, null, response.features));
            });
        });
    }

    public getExtent(id: number, service: string): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + service
        });

        let params = new Query({
            outFields: ['*']
        });

        params.where = ServiceUtil.queryTaskWhere(id, id);

        return new Promise((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Territorio(0, null, null, response.extent, null));
            })
        });
    }

    public getEntidadExtent(id: number): Promise<Territorio> {
        return this.getExtent(id, '/6'); // service entidades
    }

    public getDistritoExtent(id: number): Promise<Territorio> {
        return this.getExtent(id, '/4') // service distritos
    }

    public getMunicipioExtent(id: number): Promise<Territorio> {
        return this.getExtent(id, '/2'); // service municipios
    }
}
