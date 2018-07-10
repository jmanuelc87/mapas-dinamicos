import { Action } from "@ngrx/store";
import { Municipio } from "../models/municipio";

export const ActionTypes = {
    LOAD: '[MUN] Load',
    LOAD_SUCCESS: '[MUN] Load Success',
    LOAD_FAIL: '[MUN] Load Fail',
    CLEAN: '[MUN] Clean',
}

export class MUNLoadAction implements Action {
    type: string = ActionTypes.LOAD;

    constructor(
        public payload?: any
    ) { }
}

export class MUNLoadSuccessAction implements Action {
    type: string = ActionTypes.LOAD_SUCCESS

    constructor(
        public payload: Municipio[],
    ) { }
}

export class MUNLoadFailAction implements Action {
    type: string = ActionTypes.LOAD_FAIL;

    constructor(
        public payload: any,
    ) { }
}

export class MUNClean implements Action {
    type: string = ActionTypes.CLEAN;

    constructor(
        public payload?: any
    ) { }
}

export type MUNActionsUnion = MUNLoadAction | MUNLoadFailAction | MUNLoadSuccessAction | MUNClean;
