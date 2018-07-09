import * as fromYears from "./reducers/year.reducer";
import { ActionReducerMap, createSelector } from "@ngrx/store";

export interface AppState {
    years: fromYears.YearState;
}

export const reducers: ActionReducerMap<AppState> = {
    years: fromYears.reducer,
}


export const selectYears = (state: AppState) => state.years;
export const selectAllYears = createSelector(
    selectYears, fromYears.getAllYears
)
