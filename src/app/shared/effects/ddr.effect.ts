import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    switchMap, map,
} from 'rxjs/operators';
import { DistrictService } from '../asyncServices/ddr.service';
import { DDRLoadSuccessAction, DDRLoadAction, ActionTypes } from '../actions/ddr.action';


@Injectable()
export class DDREffects {

    constructor(
        private actions$: Actions,
        private ddrService: DistrictService,
    ) { }

    @Effect()
    getAllDDR$: Observable<DDRLoadSuccessAction> = this.actions$.pipe(
        ofType<DDRLoadAction>(ActionTypes.LOAD),
        map(action => action.payload),
        switchMap(query => {
            return this.ddrService.getDistrictsByState(query);
        }),
    );
}
