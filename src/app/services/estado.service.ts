import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as basepath from "./url";
import { Estado } from '../models/Estado';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    private url = basepath.default + '/catalogo/estados';

    constructor(
        private http: HttpClient,
    ) { }

    public getAllEstados() {
        return this.http.get<Estado[]>(this.url);
    }

}
