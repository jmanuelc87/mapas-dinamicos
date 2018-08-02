import { Injectable } from '@angular/core';
import { Estado } from '../models/Estado';

import * as basepath from "./url";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Distrito } from '../models/distrito';

@Injectable({
    providedIn: 'root'
})
export class DistritoService {

    private url = basepath.default.baseUrl + '/catalogo/distritos';

    constructor(
        private http: HttpClient,
    ) { }

    public getDistritoByEstado(estadoid) {

        const params = new HttpParams({
            fromObject: {
                id: estadoid
            }
        });

        return this.http.get<Distrito[]>(this.url, { params: params });
    }

}
