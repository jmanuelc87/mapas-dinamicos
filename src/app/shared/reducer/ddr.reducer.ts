import { District } from '../models/ddr';
import { DDRActionsUnion, ActionTypes } from '../actions/ddr.action';

export interface DDRState {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    data: District[];
}

let ddr: District[] = [{ name: 'Todos', id: 0 }];

const INITIAL_STATE: DDRState = {
    loading: false,
    loaded: false,
    failed: false,
    data: [
        ddr[0]
    ],
}

export function districtReducer(state = INITIAL_STATE, action: DDRActionsUnion): DDRState {
    if (!action) return state;

    switch (action.type) {
        case ActionTypes.LOAD: {
            let prop = {
                loading: true,
            };
            return Object.assign({}, state, prop);
        }

        case ActionTypes.LOAD_SUCCESS: {

            let data = [...ddr, ...action.payload];

            let props = {
                loaded: true,
                loading: false,
                failed: false,
                data: data,
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

        case ActionTypes.CLEAN: {
            let data = [...ddr];

            let props = {
                data: data
            }

            return Object.assign({}, state, props);
        }

        default: {
            return state;
        }
    }
}


export const getAllDistricts = (state: DDRState) => state.data;
