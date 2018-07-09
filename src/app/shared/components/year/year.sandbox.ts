import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from 'rxjs/operators';
import * as fromYears from "../../store/reducers/year.reducer";
import * as YearActions from "../../store/actions/year.action";

@Injectable()
export class YearSandbox {

    constructor(
        private store: Store<fromYears.State>,
    ) { }

    public getAllYears() {
        console.log('get all years', this.store);
        let select = this.store.select(fromYears.getAllYears);
        console.log("select (1)", select);
        select = select.pipe(
            take(1),
        );
        console.log("select (2)", select);
        return select;
    }

    public searchAllYears(search: string) {
        console.log('search all years!', this.store);
        return this.store.dispatch(new YearActions.YearLoadAction(search));
    }

}
