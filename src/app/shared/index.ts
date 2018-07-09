import { ActionReducerMap, createSelector } from '@ngrx/store';
import { getAllYears, yearReducer, YearState } from './reducer/year.reducer';


export interface AppState {
    years: YearState;
}

export const reducers: ActionReducerMap<AppState> = {
    years: yearReducer,
}

export const selectYears = (state: AppState) => state.years;
export const selectAllYears = createSelector(
    selectYears, getAllYears
)
