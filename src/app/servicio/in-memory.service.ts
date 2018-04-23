import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class InMemoryService {

    private db = new Map<string, any>();

    constructor() { }


    public add(id, object) {
        this.db.set(id, object);
    }

    public addMany(array: Array<Array<any>>) {
        for (let item of array) {
            this.db.set(item[0], item[1]);
        }
    }

    public getFromObservable() {
        return Rx.Observable.of(this.db);
    }

}
