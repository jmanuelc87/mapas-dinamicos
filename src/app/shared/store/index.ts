import * as fromYears from "./reducers/year.reducer";
import { ActionReducer, compose, combineReducers } from "@ngrx/store";


export interface State {
    years: fromYears.State;
}

const reducers = {
    years: fromYears.reducer,
}
