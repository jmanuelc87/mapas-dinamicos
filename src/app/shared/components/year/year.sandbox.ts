import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { YearLoadAction } from "../../actions/year.action";
import { selectAllYears, AppState } from "../..";

@Injectable()
export class YearSandbox {

    constructor(
        private store: Store<AppState>,
    ) { }

    public getAllYears() {
        return this.store.select(selectAllYears);
    }

    public searchAllYears() {
        this.store.dispatch(new YearLoadAction());
    }

}
