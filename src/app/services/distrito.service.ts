import { Injectable } from '@angular/core';
import { Estado } from '../models/Estado';

import * as basepath from "./url";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DistritoService {

    private url = basepath.default + '/catalogo/distritos';

    constructor(
        private http: HttpClient,
    ) { }

    public getDistritoByEstado(estadoid) {

        const params = new HttpParams({
            fromObject: {
                id: estadoid
            }
        });

        return this.http.get<Estado[]>(this.url, { params: params });
    }

}
