import * as basepath from './url';
import { Injectable, Query } from '@angular/core';
import { EsriProviderService } from './esri-provider.service';
import { UtilService } from './util.service';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GeometryService {

    public drawLimitsOn = new Subject<any>();

    public drawOn = new Subject<any>();

    public clean = new Subject<any>();

    private url = basepath.default.webServiceUrl;

    getQueryGeometry: (service, where) => void;

    constructor(
        private esriProvider: EsriProviderService,
        private utilService: UtilService,
    ) { }

    public getGeometry(objResponse) {
        return this.esriProvider.require(['esri/tasks/QueryTask', 'esri/tasks/support/Query'])
            .then(([QueryTask, Query]) => {

                let getQueryGeometry = (service, where) => {
                    let queryTask = new QueryTask({
                        url: this.url + service,
                    });

                    let params = new Query({
                        returnGeometry: true,
                        outFields: ['*'],
                    });

                    params.where = where;

                    queryTask.execute(params).then((response) => {

                        let obj = {
                            query: objResponse.query,
                            geometries: response.features,
                            color: objResponse.color,
                        }

                        this.drawOn.next(obj);
                    });
                }

                if (objResponse.regions.length > 0) {
                    if (!this.isEmpty(objResponse.regions, 'cvempio')) {
                        for (let item of objResponse.regions) {
                            let id_ent = this.utilService.getCVEString(item['idestado'], 2);
                            let cve = this.utilService.getCVEString(item['cvempio'], 3);
                            let where = `CVE_MUN = '${cve}' AND CVE_ENT = '${id_ent}'`;

                            getQueryGeometry('/2', where);
                        }
                    } else {
                        if (!this.isEmpty(objResponse.regions, 'cveddr')) {
                            // draw distritos
                            for (let item of objResponse.regions) {
                                let cve = this.utilService.getCVEString(item['cveddr'], 3);
                                let where = `CVE_DDR = '${cve}'`;

                                getQueryGeometry('/4', where);
                            }
                        } else {
                            if (!this.isEmpty(objResponse.regions, 'idestado')) {
                                // draw estados
                                for (let item of objResponse.regions) {
                                    let cve = this.utilService.getCVEString(item['idestado'], 2);
                                    let where = `CVE_ENT = '${cve}'`;

                                    getQueryGeometry('/6', where);
                                }
                            }
                        }
                    }
                }
            });
    }

    public getGeometryWithColumnsAsync(columns, filtro): Array<Promise<any>> {

        let query;
        let fields;
        let stringSize;
        let service;

        if (filtro == 'estado') {
            query = ['CVE_ENT'];
            fields = ['idestado'];
            stringSize = [2];
            service = '/6';
        }

        if (filtro == 'distrito') {
            query = ['CVE_DDR'];
            fields = ['iddistrito'];
            stringSize = [3];
            service = '/4'
        }

        if (filtro == 'municipio') {
            query = ['CVE_ENT', 'CVE_MUN'];
            fields = ['idestado', 'idmunicipio'];
            stringSize = [2, 3];
            service = '/2'
        }

        if (filtro == 'ddr-mun') {
            query = ['CVE_ENT', 'CVE_MUN'];
            fields = ['idestado', 'idmunicipio'];
            stringSize = [2, 3];
            service = '/2';
        }

        let obj = this.parseQuery(columns, fields);
        let parsed = this.createParameters(obj, query, fields, stringSize);

        let promises = [];
        for (let where of parsed) {
            let promise = this.getGeometryAsync(service, where);
            promises.push(promise);
        }

        return promises;
    }

    private getGeometryAsync(service, where): Promise<any> {
        return new Promise((resolve, reject) => {
            this.esriProvider
                .require(['esri/tasks/QueryTask', 'esri/tasks/support/Query'])
                .then(([QueryTask, Query]: [__esri.QueryTaskConstructor, __esri.QueryConstructor]) => {
                    let queryTask = new QueryTask({
                        url: this.url + service,
                    });

                    let params = new Query({
                        returnGeometry: true,
                        outFields: ['*'],
                        where: where,
                    });

                    queryTask.execute(params).then((response) => {
                        resolve(response);
                    }, (reason) => {
                        reject(reason);
                    });
                });
        });
    }

    public createParameters(objData: any[], query: string[], fields: string[], stringSize: number[]) {
        let queries = [];
        for (let item of objData) {
            let where = '';
            if (query.length == fields.length && fields.length == stringSize.length) {
                let cve;
                for (let i = 0; i < fields.length; i++) {
                    cve = this.utilService.getStringFromArray(item[fields[i]], stringSize[i]);
                    where += `${query[i]} IN (${cve}) AND `
                }
                where = where.substr(0, where.length - 5);
            }
            queries.push(where);
        }
        return queries;
    }

    public parseQuery(columns, fields: string[]) {

        let data = [];
        let temp;
        let count = 0;
        let colsCount = 0

        if (columns.length > 0) {
            let obj = {};
            for (let item of columns) {

                for (let field of fields) {

                    if (item[field] != undefined) {

                        if (temp != undefined && temp.field == field && temp.item != item[field]) {
                            data.push(obj);
                            obj = {};
                        }

                        if (obj[field] == undefined) {
                            obj[field] = [];
                        }

                        if (obj[field].indexOf(item[field]) == -1) {
                            obj[field].push(item[field]);
                        }
                    }

                    if (count == 0) {
                        temp = {
                            field: field,
                            item: item[field],
                        }
                    }
                    count++;
                }

                count = 0;

                if (columns.length - 1 == colsCount++) {
                    data.push(obj);
                }
            }
        }

        return data;
    }

    public getGeometryForState(cve) {
        return new Promise((resolve, reject) => {
            this.esriProvider
                .require(['esri/tasks/QueryTask', 'esri/tasks/support/Query'])
                .then(([QueryTask, Query]: [__esri.QueryTaskConstructor, __esri.QueryConstructor]) => {
                    let queryTask = new QueryTask({
                        url: this.url + '/6',
                    });

                    let where = `CVE_ENT =  + '${this.utilService.getCVEString(cve, 2)}'`;

                    let params = new Query({
                        returnGeometry: true,
                        outFields: ['*'],
                        where: where,
                    });

                    queryTask.execute(params).then((response) => {
                        console.log(response);
                        resolve(response);
                    }, (reason) => {
                        reject(reason);
                    });
                });
        });
    }

    private isEmpty(columns, key) {
        for (let item of columns) {
            if (item[key] == undefined || item[key] == null || item[key] == '' || item[key] == '0' || item[key] == -1) {
                return true;
            }
        }

        return false;
    }

    public cleanMap() {
        this.clean.next();
    }
}
