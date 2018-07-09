import { Action } from "@ngrx/store";
import { District } from "../models/ddr";

export const ActionTypes = {
    LOAD: '[DDR] Load',
    LOAD_SUCCESS: '[DDR] Load Success',
    LOAD_FAIL: '[DDR] Load Fail',
}

export class DDRLoadAction implements Action {
    type: string = ActionTypes.LOAD;

    constructor(
        public payload?: any
    ) { }
}

export class DDRLoadSuccessAction implements Action {
    type: string = ActionTypes.LOAD_SUCCESS

    constructor(
        public payload: District[],
    ) { }
}

export class DDRLoadFailAction implements Action {
    type: string = ActionTypes.LOAD_FAIL;

    constructor(
        public payload: any,
    ) { }
}

export type DDRActionsUnion = DDRLoadAction | DDRLoadFailAction | DDRLoadSuccessAction;
