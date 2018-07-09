import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import {
    switchMap, map,
} from 'rxjs/operators';
import { Action } from "@ngrx/store";
import * as YearActions from "../actions/year.action";
import { Year } from "../../models/year";


@Injectable()
export class YearEffects {

    constructor(
        private actions$: Actions
    ) { }

    @Effect()
    getAllYears$: Observable<YearActions.YearLoadSuccessAction> = this.actions$.pipe(
        ofType<YearActions.YearLoadAction>(YearActions.ActionTypes.LOAD),
        map(action => action.payload),
        switchMap(query => {

            console.log('switchMap init', query);

            let years: Year[] = [
                { year: 2016 },
                { year: 2015 },
                { year: 2014 },
                { year: 2013 }
            ];

            let toReturn = of(new YearActions.YearLoadSuccessAction(years));

            console.log('in effect(1)', toReturn);

            return toReturn;
        }),
    );

}
