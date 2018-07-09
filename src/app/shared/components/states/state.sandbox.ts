import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { State } from "../../models/states";
import { Store } from "@ngrx/store";
import { AppState, selectAllStates, } from "../..";
import { StateLoadAction } from "../../actions/state.action";

@Injectable()
export class StateSandbox {

    constructor(
        private store: Store<AppState>
    ) { }

    public getAllStates(): Observable<State[]> {
        return this.store.select(selectAllStates)
    }

    public fetchAllStates() {
        this.store.dispatch(new StateLoadAction());
    }
}
