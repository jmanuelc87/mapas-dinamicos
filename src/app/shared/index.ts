import { ActionReducerMap, createSelector } from '@ngrx/store';
import { getAllYears, yearReducer, YearState } from './reducer/year.reducer';
import { EntityState, stateReducer, getAllStates } from './reducer/state.reducer';
import { DDRState, districtReducer, getAllDistricts } from './reducer/ddr.reducer';


export interface AppState {
    years: YearState;
    states: EntityState;
    ddrs: DDRState;
}

export const reducers: ActionReducerMap<AppState> = {
    years: yearReducer,
    states: stateReducer,
    ddrs: districtReducer,
}

const slicerAppStateYears = (state: AppState) => state.years;
export const selectAllYears = createSelector(
    slicerAppStateYears, getAllYears
)

const slicerAppStateStates = (state: AppState) => state.states;
export const selectAllStates = createSelector(
    slicerAppStateStates, getAllStates
)


const slicerAppStateDistricts = (state: AppState) => state.ddrs;
export const selectAllDistricts = createSelector(
    slicerAppStateDistricts, getAllDistricts
)
