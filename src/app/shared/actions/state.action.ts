import { Action } from "@ngrx/store";
import { State as AppState } from "../models/states";

export const ActionTypes = {
    LOAD: '[State] Load',
    LOAD_SUCCESS: '[State] Load Success',
    LOAD_FAIL: '[State] Load Fail',
}

export class StateLoadAction implements Action {
    type: string = ActionTypes.LOAD;

    constructor(
        public payload?: any
    ) { }
}

export class StateLoadSuccessAction implements Action {
    type: string = ActionTypes.LOAD_SUCCESS

    constructor(
        public payload: AppState[],
    ) { }
}

export class StateLoadFailAction implements Action {
    type: string = ActionTypes.LOAD_FAIL;

    constructor(
        public payload: any,
    ) { }
}

export type StateActionsUnion = StateLoadAction | StateLoadFailAction | StateLoadSuccessAction;
