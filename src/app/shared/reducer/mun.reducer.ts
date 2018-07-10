import { Municipio } from "../models/municipio";
import { MUNActionsUnion, ActionTypes } from "../actions/mun.action";

export interface MUNState {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    data: Municipio[];
}

let mun: Municipio[] = [{ name: 'Todos', id: 0, cve_ent: 0 }];

const INITIAL_STATE: MUNState = {
    loading: false,
    loaded: false,
    failed: false,
    data: [
        mun[0]
    ],
}

export function municipioReducer(state = INITIAL_STATE, action: MUNActionsUnion): MUNState {
    if (!action) return state;

    switch (action.type) {
        case ActionTypes.LOAD: {
            let prop = {
                loading: true,
            };
            return Object.assign({}, state, prop);
        }

        case ActionTypes.LOAD_SUCCESS: {

            let data = [...mun, ...action.payload];

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

        default: {
            return state;
        }
    }
}


export const getAllMunicipios = (state: MUNState) => state.data;
