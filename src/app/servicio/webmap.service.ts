import { Injectable } from '@angular/core';
import { Territorio } from '../dominio/territorio';
import { Observable } from 'rxjs/Observable';

import * as Rx from 'rxjs';
import * as QueryTask from 'esri/tasks/QueryTask';
import * as Query from 'esri/tasks/support/Query';
import { Extent } from 'esri/geometry';

@Injectable()
export class WebmapService {

    private url = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    constructor() { }

    public getEntidadesExtent(): Observable<any> {

        const queryTask = new QueryTask({
            url: this.url
        });

        const params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        const observable = Rx.Observable.create(observer => {
            queryTask.executeForExtent(params).then(response => {
                observer.next(response.fullExtent);
            });
        });

        return observable;
    }


    public getAllEntidadesGeometry(): Observable<any> {
        const queryTask = new QueryTask({
            url: this.url + '/6'
        });

        const params = new Query({
            returnGeometry: true,
            outFields: ['*']
        });

        params.where = `CVE_ENT IN (
                '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                '31', '32')`;

        const observable = Rx.Observable.create(obs => {
            queryTask.execute(params).then(response => {
                console.log('get response...');
                obs.next(response.features);
            });
        });

        return observable;
    }

}
