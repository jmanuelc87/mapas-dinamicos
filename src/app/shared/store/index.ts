import * as fromYears from "./reducers/year.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface State {
    years: fromYears.State;
}

export const reducers: ActionReducerMap<State> = {
    years: fromYears.reducer,
}
