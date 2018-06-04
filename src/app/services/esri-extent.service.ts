import * as basepath from './url';
import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { UtilService } from './util.service';
import { EsriProviderService } from './esri-provider.service';

@Injectable({
    providedIn: 'root'
})
export class EsriExtentService {

    private url = basepath.default.webServiceUrl;

    public extentRequest = new Subject<any>();

    public extentComplete = new Subject<void>();

    private defaultExtent: any = {
        xmin: -1.3181079254E7,
        ymin: 1635334.4664000012,
        xmax: -9652558.1611,
        ymax: 3858021.4844999984,
        spatialReference: {
            wkid: 102100
        }
    };

    constructor(
        private util: UtilService,
        private esriProvider: EsriProviderService,
    ) { }

    public moveTo(extent) {
        this.extentRequest.next(extent);
    }

    public complete() {
        this.extentComplete.next();
    }

    public fetchExtentEstado(id) {
        this.fetchExtent('CVE_ENT', id, '/6', 2);
    }

    public fetchExtentDistrito(id) {
        this.fetchExtent('CVE_DDR', id, '/4', 3);
    }

    public fetchExtentMunicipio(idestado, idmunicipio) {
        this.esriProvider.require([
            'esri/tasks/QueryTask',
            'esri/tasks/support/Query'])
            .then(([QueryTask, Query]) => {
                let queryTask = new QueryTask({
                    url: this.url + '/2',
                });

                let params = new Query({
                    outfields: ['*']
                });

                let id_ent = this.util.getCVEString(idestado, 2);
                let id_mun = this.util.getCVEString(idmunicipio, 3);

                params.where = `CVE_ENT = '${id_ent}' AND CVE_MUN = '${id_mun}'`;

                queryTask.executeForExtent(params).then((response) => {
                    this.moveTo(response.extent);
                });
            });
    }

    public fetchExtentAll() {
        this.esriProvider.require([
            'esri/geometry/Extent',
        ]).then(([Extent]) => {
            this.moveTo(new Extent(this.defaultExtent));
        });
    }

    private fetchExtent(field, id, service: string, lenght: number) {
        this.esriProvider.require([
            'esri/tasks/QueryTask',
            'esri/tasks/support/Query'])
            .then(([QueryTask, Query]) => {

                let queryTask = new QueryTask({
                    url: this.url + service,
                });

                let params = new Query({
                    outfields: ['*']
                });


                let cve = this.util.getCVEString(id, lenght);
                params.where = `${field} = '${cve}'`;

                queryTask.executeForExtent(params).then((response) => {
                    this.moveTo(response.extent);
                });
            });
    }
}
