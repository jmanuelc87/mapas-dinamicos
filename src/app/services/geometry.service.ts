import * as basepath from './url';
import { Injectable, Query } from '@angular/core';
import { EsriProviderService } from './esri-provider.service';
import { UtilService } from './util.service';
import { Subject, Subscriber } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GeometryService {

    public drawOn = new Subject<any>();

    public clean = new Subject<any>();

    private url = basepath.default.webServiceUrl;

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
                        console.log('draw mun');
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

    private isEmpty(columns, key) {
        for (let item of columns) {
            if (item[key] == undefined || item[key] == null || item[key] == '' || item[key] == '0') {
                return true;
            }
        }

        return false;
    }

    public cleanMap() {
        this.clean.next();
    }
}
