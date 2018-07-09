import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { District } from '../models/ddr';
import { DDRLoadSuccessAction, DDRLoadFailAction } from '../actions/ddr.action';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DistrictService {

    private url = environment.baseUrl + '/catalogo/distritos';

    constructor(
        private http: HttpClient,
    ) { }

    public getDistrictsByState(id: number) {

        let params = new HttpParams({
            fromObject: {
                id: id.toString(),
            }
        });

        return this.http.get<District[]>(this.url, {
            params: params,
        })
            .pipe(
                map(response => new DDRLoadSuccessAction(response)),
                catchError(err => of(new DDRLoadFailAction(err))),
        );
    }

}
