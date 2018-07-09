import { Component, OnInit } from '@angular/core';
import { StateSandbox } from './state.sandbox';
import { Observable } from 'rxjs';
import { State } from '../../models/states';

@Component({
    selector: 'app-select-states',
    templateUrl: './states.component.html',
    styleUrls: ['./states.component.scss'],
    providers: [StateSandbox],
})
export class StatesComponent implements OnInit {

    private data$: Observable<State[]>

    constructor(
        private sandbox: StateSandbox,
    ) { }

    ngOnInit() {
        this.data$ = this.sandbox.getAllStates();
        this.data$.subscribe(response => console.log(response));
        this.load();
    }

    load() {
        this.sandbox.fetchAllStates();
    }

}
