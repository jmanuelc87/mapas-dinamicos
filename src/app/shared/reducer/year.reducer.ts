import * as actions from '../actions/year.action';
import { Year } from '../models/year';

export interface YearState {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    data: Year[];
}

const INITIAL_STATE: YearState = {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
}

export function yearReducer(state = INITIAL_STATE, action: actions.YearActionsUnion): YearState {
    if (!action) return state;

    switch (action.type) {
        case actions.ActionTypes.LOAD: {
            let prop = {
                loading: true,
            };
            return Object.assign({}, state, prop);
        }

        case actions.ActionTypes.LOAD_SUCCESS: {
            let props = {
                loaded: true,
                loading: false,
                failed: false,
                data: action.payload,
            };
            return Object.assign({}, state, props);
        }

        case actions.ActionTypes.LOAD_FAIL: {
            let props = {
                loaded: false,
                loading: false,
                failed: true,
                data: [],
            };

            return Object.assign({}, state, props);
        }

        default: {
            return state;
        }
    }
}


export const getAllYears = (state: YearState) => state.data;
