import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    switchMap, map, mergeMap,
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
        mergeMap(action => {
            let query = action.payload;
            return this.ddrService.getDistrictsByState(query);
        }),
    );
}
