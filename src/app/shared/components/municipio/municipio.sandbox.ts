import { Observable } from "rxjs";
import { Municipio } from "../../models/municipio";
import { Store } from "@ngrx/store";
import { AppState, selectAllMunicipios } from "../..";
import { MUNLoadAction, MUNClean } from "../../actions/mun.action";
import { Injectable } from "@angular/core";

@Injectable()
export class MunicipioSandbox {


    constructor(
        private store: Store<AppState>
    ) { }


    public getMunicipios(): Observable<Municipio[]> {
        return this.store.select(selectAllMunicipios);
    }

    public searchMunicipiosByIds(estadoid: number, distritoid: number) {
        return this.store.dispatch(new MUNLoadAction({
            estadoid: estadoid,
            distritoid: distritoid,
        }));
    }

    public cleanMunicipios() {
        this.store.dispatch(new MUNClean());
    }

}
