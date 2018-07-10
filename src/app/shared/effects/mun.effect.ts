import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    mergeMap, filter,
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
    getAllMUN$: Observable<MUNLoadSuccessAction> = this.actions$.pipe(
        ofType<MUNLoadAction>(ActionTypes.LOAD),
        mergeMap(action => {
            let query = action.payload;
            return this.service.getMunicipiosByIds(query.estadoid, query.distritoid);
        }),
    );
}
