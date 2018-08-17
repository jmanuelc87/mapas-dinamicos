import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import * as basepath from "./url";


@Injectable({
    providedIn: 'root'
})
export class PopupService {

    private url = 'http://localhost:8080/md/server.php' + '/cierre';

    public queryConsultaSubject: Subject<any> = new Subject();

    constructor(
        private http: HttpClient,
    ) { }

    addConsultaParameters(query) {
        this.queryConsultaSubject.next(query);
    }

    getCierreByAnuario(consulta) {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post<any>(this.url, consulta, {
            headers: headers
        });
    }
}
