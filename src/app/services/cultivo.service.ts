import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as basepath from "./url";

@Injectable({
    providedIn: 'root'
})
export class CultivoService {

    private url = basepath.default.baseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getCultivos(catalogo: string) {
        let url = this.url + '/catalogo/cultivos/' + catalogo;

        return this.http.get<Array<any>>(url);
    }

    public getVariedadesByCultivo(cultivoid) {
        let url = this.url + '/catalogo/variedades/' + cultivoid;

        return this.http.get<Array<any>>(url);
    }

}
