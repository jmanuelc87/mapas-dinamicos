import { State } from '../models/states';
import { StateActionsUnion, ActionTypes } from '../actions/state.action';

export interface EntityState {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    data: State[];
}

const INITIAL_STATE: EntityState = {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
}

export function stateReducer(state = INITIAL_STATE, action: StateActionsUnion): EntityState {
    if (!action) return state;

    switch (action.type) {
        case ActionTypes.LOAD: {
            let prop = {
                loading: true,
            };
            return Object.assign({}, state, prop);
        }

        case ActionTypes.LOAD_SUCCESS: {
            let props = {
                loaded: true,
                loading: false,
                failed: false,
                data: action.payload,
            };
            return Object.assign({}, state, props);
        }

        case ActionTypes.LOAD_FAIL: {
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


export const getAllStates = (state: EntityState) => state.data;
