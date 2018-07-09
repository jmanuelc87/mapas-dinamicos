import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Year } from '../models/year';
import { YearLoadSuccessAction } from "../actions/year.action";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class YearService {

    private url = environment.baseUrl + '/catalogo/years';

    constructor(
        private http: HttpClient,
    ) { }

    public getAllYears() {
        return this.http.get<Year[]>(this.url)
            .pipe(
                map(response => new YearLoadSuccessAction(response)),
        );
    }
}
