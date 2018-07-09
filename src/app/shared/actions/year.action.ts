import { Action } from "@ngrx/store";
import { Year } from "../models/year";

export const ActionTypes = {
    LOAD: '[Year] Load',
    LOAD_SUCCESS: '[Year] Load Success',
    LOAD_FAIL: '[Year] Load Fail',
}

export class YearLoadAction implements Action {
    type: string = ActionTypes.LOAD;

    constructor(
        public payload?: any
    ) { }
}

export class YearLoadSuccessAction implements Action {
    type: string = ActionTypes.LOAD_SUCCESS

    constructor(
        public payload: Year[],
    ) { }
}

export class YearLoadFailAction implements Action {
    type: string = ActionTypes.LOAD_FAIL;

    constructor(
        public payload: any,
    ) { }
}

export type YearActionsUnion = YearLoadAction | YearLoadFailAction | YearLoadSuccessAction;
