import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import {
    switchMap, map,
} from 'rxjs/operators';
import * as YearActions from "../actions/year.action";
import { Year } from "../../models/year";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class YearEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    getAllYears$: Observable<YearActions.YearLoadSuccessAction> = this.actions$.pipe(
        ofType<YearActions.YearLoadAction>(YearActions.ActionTypes.LOAD),
        map(action => action.payload),
        switchMap(query => {
            return this.http.get<Year[]>('http://cmgs.gob.mx:82/mapas/server.php/catalogo/years')
                .pipe(
                    map(response => new YearActions.YearLoadSuccessAction(response)),
            );
        }),
    );

}
