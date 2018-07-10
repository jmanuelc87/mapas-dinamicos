import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState, selectAllDistricts } from "../..";
import { Observable } from "rxjs";
import { District } from "../../models/ddr";
import { DDRLoadAction, DDRCleanAction } from "../../actions/ddr.action";

@Injectable()
export class DistrictSandbox {

    constructor(
        private store: Store<AppState>
    ) { }

    public getDistricts(): Observable<District[]> {
        return this.store.select(selectAllDistricts);
    }

    public searchDistrictsByState(id: number) {
        this.store.dispatch(new DDRLoadAction(id));
    }

    public cleanDistricts() {
        this.store.dispatch(new DDRCleanAction());
    }
}
