import * as FindParameters from 'esri/tasks/support/FindParameters';
import * as FindTask from 'esri/tasks/FindTask';
import * as Query from 'esri/tasks/support/Query';
import * as QueryTask from 'esri/tasks/QueryTask';
import { Estado } from '../dominio/estado';
import { Extent } from 'esri/geometry';
import { Injectable } from '@angular/core';
import { Municipio } from '../dominio/municipio';
import { range } from 'rxjs/observable/range';
import { reject } from 'q';
import { ServiceUtil } from '../util/util';
import { Territorio } from '../dominio/territorio';


@Injectable()
export class WebmapService {

    private url = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    constructor() { }

    public getFullExtent(): Promise<Territorio> {
        const queryTask = new QueryTask({
            url: this.url
        });

        const params = new Query({
            outFields: ['*']
        });

        return new Promise<Territorio>((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Estado(0, null, response.fullExtent));
            }).catch(err => reject(err));
        });
    }

    public getGeometryEntidadAll(): Promise<Territorio> {
        const queryTask = new QueryTask({
            url: this.url + '/6' // service entidades
        });

        const params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        params.where = ServiceUtil.queryTaskWhere('CVE_ENT', 1, 32, 2);


        return new Promise<Territorio>((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Estado(0, null, null, response.features));
            }).catch(err => reject(err));
        });
    }

    private getExtent(field: string, id: number, service: string, lenght: number): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + service
        });

        let params = new Query({
            outFields: ['*']
        });

        let cve = ServiceUtil.getCVEString(id, lenght);
        params.where = `${field} = '${cve}'`;

        return new Promise((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Territorio(0, null, response.extent));
            }).catch(err => reject(err));
        });
    }

    private getGeometry(field: string, id: number, service: string, lenght: number): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + service
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        let cve = ServiceUtil.getCVEString(id, lenght);
        params.where = `${field} = '${cve}'`

        return new Promise((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Territorio(0, null, null, response.features));
            }).catch(err => reject(err));
        });
    }

    public getExtentByEntidad(id: number): Promise<Territorio> {
        return this.getExtent('CVE_ENT', id, '/6', 2); // service entidades
    }

    public getDistritoExtent(id: number): Promise<Territorio> {
        return this.getExtent('CVE_DDR', id, '/4', 3) // service distritos
    }

    public getMunicipioExtent(cve_ent: number, cve_mun: number): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + '/2'
        });

        let params = new Query({
            outFields: ['*']
        });

        let id_ent = ServiceUtil.getCVEString(cve_ent, 2);
        let id_mun = ServiceUtil.getCVEString(cve_mun, 3);

        params.where = `CVE_ENT = '${id_ent}' AND CVE_MUN = '${id_mun}'`;

        return new Promise((resolve, reject) => {
            queryTask.executeForExtent(params).then(response => {
                resolve(new Municipio(0, null, response.extent));
            }).catch(err => reject(err));
        });
    }

    public getGeometryEntidad(id: number): Promise<Territorio> {
        return this.getGeometry('CVE_ENT', id, '/6', 2); // service entidades
    }

    public getGeometryDistrito(id: number): Promise<Territorio> {
        return this.getGeometry('CVE_DDR', id, '/4', 3); // service distritos
    }

    public getGeometryMunicipioByEntidad(cve_ent: number, cve_mun: number): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + '/2'
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        let id_ent = ServiceUtil.getCVEString(cve_ent, 2);
        let id_mun = ServiceUtil.getCVEString(cve_mun, 3);

        params.where = `CVE_ENT = '${id_ent}' AND CVE_MUN = '${id_mun}'`;

        return new Promise((resolve, reject) => {
            queryTask.execute(params).then(response => {
                //console.log(response.features[0].attributes['NOM_MUN']);
                resolve(new Territorio(0, null, null, response.features));
            }).catch(err => reject(err));
        });
    }

    public getGeometryMunicipiosByEntidad(cve_ent: number, cve_mun: number[]): Promise<Territorio> {

        let queryTask = new QueryTask({
            url: this.url + '/2'
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        let id_ent = ServiceUtil.getCVEString(cve_ent, 2);
        let id_mun = ServiceUtil.getStringFromArray(cve_mun, 3);

        params.where = `CVE_ENT = '${id_ent}' AND CVE_MUN IN (${id_mun})`;

        return new Promise((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Territorio(0, null, null, response.features));
            }).catch(err => reject(err));
        });
    }

    public getGeometryByEntidades(id: number[]): Promise<Territorio> {
        let queryTask = new QueryTask({
            url: this.url + '/6'
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        let cve = ServiceUtil.getStringFromArray(id, 2);

        params.where = `CVE_ENT IN (${cve})`;

        return new Promise((resolve, reject) => {
            queryTask.execute(params).then(response => {
                resolve(new Territorio(0, null, null, response.features));
            }).catch(err => reject(err));
        });
    }
}
