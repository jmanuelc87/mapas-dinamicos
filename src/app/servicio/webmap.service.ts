import * as FindParameters from 'esri/tasks/support/FindParameters';
import * as FindTask from 'esri/tasks/FindTask';
import * as Query from 'esri/tasks/support/Query';
import * as QueryTask from 'esri/tasks/QueryTask';
import { Extent } from 'esri/geometry';
import { Injectable } from '@angular/core';
import { Territorio } from '../dominio/territorio';
import { ServiceUtil } from '../util/util';
import { range } from 'rxjs/observable/range';
import { Estado } from '../dominio/estado';
import { Municipio } from '../dominio/municipio';


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
                resolve(new Estado(0, null, response.fullExtent));
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

        params.where = ServiceUtil.queryTaskWhere('CVE_ENT', 1, 32, [0, 9]);

        return new Promise<Territorio>((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Estado(0, null, null, response.features));
            });
        });
    }

    public getExtent(field: string, id: number, service: string, range: number[]): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + service
        });

        let params = new Query({
            outFields: ['*']
        });

        params.where = ServiceUtil.queryTaskWhere(field, id, id, range);

        return new Promise((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Territorio(0, null, response.extent));
            })
        });
    }

    public getGeometry(field: string, id: number, service: string, range: number[]): Promise<Territorio> {

        let queryTask = new QueryTask({
            url: this.url + service
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        params.where = ServiceUtil.queryTaskWhere(field, id, id, range);

        return new Promise((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Territorio(0, null, null, response.features));
            });
        });
    }

    public getEntidadExtent(id: number): Promise<Territorio> {
        return this.getExtent('CVE_ENT', id, '/6', [0, 9]); // service entidades
    }

    public getDistritoExtent(id: number): Promise<Territorio> {
        return this.getExtent('CVE_DDR', id, '/4', [0, 99]) // service distritos
    }

    public getMunicipioExtent(cve_ent: number, cve_mun: number): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + '/2'
        });

        let params = new Query({
            outFields: ['*']
        });

        let id_ent = ServiceUtil.getCVEString(cve_ent, [0, 9]);
        let id_mun = ServiceUtil.getCVEString(cve_mun, [0, 99]);

        params.where = `CVE_ENT = '${id_ent}' AND CVE_MUN = '${id_mun}'`;

        return new Promise((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Municipio(0, null, response.extent));
            })
        });
    }

    public getEntidadGeometry(id: number): Promise<Territorio> {
        return this.getGeometry('CVE_ENT', id, '/6', [0, 9]); // service entidades
    }

    public getDistritoGeometry(id: number): Promise<Territorio> {
        return this.getGeometry('CVE_DDR', id, '/4', [0, 99]); // service distritos
    }

    public getMunicipioGeometry(cve_ent: number, cve_mun: number): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + '/2'
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        let id_ent = ServiceUtil.getCVEString(cve_ent, [0, 9]);
        let id_mun = ServiceUtil.getCVEString(cve_mun, [0, 99]);

        params.where = `CVE_ENT = '${id_ent}' AND CVE_MUN = '${id_mun}'`;

        return new Promise((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Territorio(0, null, null, response.features));
            });
        });
    }
}
