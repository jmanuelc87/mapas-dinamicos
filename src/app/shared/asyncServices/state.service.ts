import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../models/states';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { StateLoadSuccessAction } from '../actions/state.action';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private url = environment.baseUrl + '/catalogo/estados';

    constructor(
        private http: HttpClient,
    ) { }

    public getAllStates() {
        return this.http.get<State[]>(this.url)
            .pipe(
                map(response => new StateLoadSuccessAction(response))
            );
    }

}