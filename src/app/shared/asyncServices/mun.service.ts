import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Municipio } from '../models/municipio';
import { MUNLoadSuccessAction, MUNLoadFailAction } from '../actions/mun.action';

@Injectable({
    providedIn: 'root'
})
export class MunicipioService {

    // TODO: check url
    private url = environment.baseUrl + '/catalogo/municipios';

    constructor(
        private http: HttpClient,
    ) { }

    public getMunicipiosByIds(estadoid: number, distritoid: number) {

        let params = new HttpParams({
            fromObject: {
                estadoid: estadoid.toString(),
                distritoid: distritoid.toString(),
            }
        });

        return this.http.get<Municipio[]>(this.url, {
            params: params,
        })
            .pipe(
                map(response => new MUNLoadSuccessAction(response)),
                catchError(err => of(new MUNLoadFailAction(err))),
        );
    }

}
