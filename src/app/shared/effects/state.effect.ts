import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    switchMap, map,
} from 'rxjs/operators';
import { StateService } from '../asyncServices/state.service';
import { StateLoadSuccessAction, StateLoadAction, ActionTypes } from '../actions/state.action';


@Injectable()
export class StateEffects {

    constructor(
        private actions$: Actions,
        private stateService: StateService,
    ) { }

    @Effect()
    getAllStates$: Observable<StateLoadSuccessAction> = this.actions$.pipe(
        ofType<StateLoadAction>(ActionTypes.LOAD),
        map(action => action.payload),
        switchMap(query => {
            return this.stateService.getAllStates();
        }),
    );
}
