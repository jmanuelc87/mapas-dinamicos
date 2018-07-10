import { ActionReducerMap, createSelector } from '@ngrx/store';
import { getAllYears, yearReducer, YearState } from './reducer/year.reducer';
import { EntityState, stateReducer, getAllStates } from './reducer/state.reducer';
import { DDRState, districtReducer, getAllDistricts } from './reducer/ddr.reducer';
import { MUNState, municipioReducer, getAllMunicipios } from './reducer/mun.reducer';


export interface AppState {
    years: YearState;
    states: EntityState;
    ddrs: DDRState;
    muns: MUNState;
}

export const reducers: ActionReducerMap<AppState> = {
    years: yearReducer,
    states: stateReducer,
    ddrs: districtReducer,
    muns: municipioReducer,
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

const slicerAppStateMunicipios = (state: AppState) => state.muns;
export const selectAllMunicipios = createSelector(
    slicerAppStateMunicipios, getAllMunicipios
)
