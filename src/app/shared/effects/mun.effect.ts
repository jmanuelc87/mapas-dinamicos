import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    switchMap, map,
} from 'rxjs/operators';
import { MunicipioService } from '../asyncServices/mun.service';
import { MUNLoadSuccessAction, ActionTypes, MUNLoadAction } from '../actions/mun.action';



@Injectable()
export class MunEffects {

    constructor(
        private actions$: Actions,
        private service: MunicipioService,
    ) { }

    @Effect()
    getAllDDR$: Observable<MUNLoadSuccessAction> = this.actions$.pipe(
        ofType<MUNLoadAction>(ActionTypes.LOAD),
        map(action => action.payload),
        switchMap(query => {
            return this.service.getMunicipiosByIds(query.cve_est, query.id);
        }),
    );
}
