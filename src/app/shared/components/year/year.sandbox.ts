import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as YearActions from "../../store/actions/year.action";
import { selectAllYears, AppState } from "../../store";

@Injectable()
export class YearSandbox {

    constructor(
        private store: Store<AppState>,
    ) { }

    public getAllYears() {
        console.log('get all years', this.store);
        let select = this.store.select(selectAllYears);

        select.subscribe(response => console.log(response));

        console.log("select (1)", select);
        return select;
    }

    public searchAllYears(search: string) {
        console.log('search all years!', this.store);
        return this.store.dispatch(new YearActions.YearLoadAction(search));
    }

}
