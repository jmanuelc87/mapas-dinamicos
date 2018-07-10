import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, YearLoadAction, YearLoadSuccessAction } from '../actions/year.action';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YearService } from '../asyncServices/year.service';
import {
    switchMap, map, mergeMap,
} from 'rxjs/operators';



@Injectable()
export class YearEffects {

    constructor(
        private actions$: Actions,
        private yearService: YearService,
    ) { }

    @Effect()
    getAllYears$: Observable<YearLoadSuccessAction> = this.actions$.pipe(
        ofType<YearLoadAction>(ActionTypes.LOAD),
        mergeMap(action => {
            return this.yearService.getAllYears();
        }),
    );
}
