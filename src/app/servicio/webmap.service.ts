import * as FindParameters from 'esri/tasks/support/FindParameters';
import * as FindTask from 'esri/tasks/FindTask';
import * as Query from 'esri/tasks/support/Query';
import * as QueryTask from 'esri/tasks/QueryTask';
import * as Rx from 'rxjs';
import { Extent } from 'esri/geometry';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Territorio } from '../dominio/territorio';
import { find } from 'rxjs/operators';



@Injectable()
export class WebmapService {

    private url = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    constructor() { }

    public getEntidadesExtent(): Observable<any> {

        const queryTask = new QueryTask({
            url: this.url
        });

        const params = new Query({
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
                obs.next(response);
            });
        });

        return observable;
    }

    public getExtent(id: number, service: string): Observable<any> {
        let queryTask = new QueryTask({
            url: this.url + service
        });

        let params = new Query({
            outFields: ['*']
        });

        let cve = id > 0 && id <= 9 ? '0' + id : id;

        params.where = `CVE_ENT = '${cve}'`

        let observable = Rx.Observable.create(obs => {
            queryTask.executeForExtent(params).then(response => {
                obs.next(response.extent);
            });
        });

        return observable;
    }

    public getEntidadExtent(id: number): Observable<any> {
        return this.getExtent(id, '/6');
    }

    public getDistritoExtent(id: number): Observable<any> {
        return this.getExtent(id, '/4')
    }

    public getMunicipioExtent(id: number): Observable<any> {
        return this.getExtent(id, '/2');
    }
}
