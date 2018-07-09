import { ActionReducerMap, createSelector } from '@ngrx/store';
import { getAllYears, yearReducer, YearState } from './reducer/year.reducer';
import { EntityState, stateReducer, getAllStates } from './reducer/state.reducer';


export interface AppState {
    years: YearState;
    states: EntityState;
}

export const reducers: ActionReducerMap<AppState> = {
    years: yearReducer,
    states: stateReducer,
}

const slicerAppStateYears = (state: AppState) => state.years;
export const selectAllYears = createSelector(
    slicerAppStateYears, getAllYears
)

const slicerAppStateStates = (state: AppState) => state.states;
export const selectAllStates = createSelector(
    slicerAppStateStates, getAllStates
)
