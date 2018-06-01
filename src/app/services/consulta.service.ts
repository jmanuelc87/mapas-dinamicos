import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as basepath from "./url";
import { BodyDropPivotTarget } from 'ag-grid';


@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    private url = basepath.default.baseUrl + '/consultas/prod-cultivo';

    constructor(
        private http: HttpClient
    ) { }


    getAnuario(consulta) {
        let params = new HttpParams({
            fromObject: {
                anuario: JSON.stringify(consulta)
            }
        });

        return this.http.post(this.url, '', {
            params: params
        });
    }
}
