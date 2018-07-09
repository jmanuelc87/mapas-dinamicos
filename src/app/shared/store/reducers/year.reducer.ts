import { Year } from "../../models/year";
import * as actions from "../actions/year.action";

export interface State {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    data: Year[];
}

const initial_state: State = {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
}

export function reducer(state = initial_state, action: actions.Actions): State {
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
