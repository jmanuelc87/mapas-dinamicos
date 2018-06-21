import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import * as basepath from "./url";
import { BodyDropPivotTarget } from 'ag-grid';


@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    private url = basepath.default.baseUrl;

    constructor(
        private http: HttpClient
    ) { }


    getAnuario(consulta) {
        let params = new HttpParams({
            fromObject: {
                anuario: JSON.stringify(consulta)
            }
        });

        return this.http.post(this.url + '/consultas/prod-cultivo', '', {
            params: params
        });
    }

    getEstados(consulta) {
        let params = new HttpParams({
            fromObject: {
                anuario: JSON.stringify(consulta)
            }
        });

        return this.http.post(this.url + '/consultas/estados', '', {
            params: params
        });
    }

    getAnuarioByEstado(consulta) {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + '/consultas/prod-estado', consulta, {
            headers: headers,
        });
    }
}
