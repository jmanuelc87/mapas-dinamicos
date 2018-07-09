import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

    @Output()
    public selected: EventEmitter<State> = new EventEmitter();

    constructor(
        private sandbox: StateSandbox,
    ) { }

    ngOnInit() {
        this.data$ = this.sandbox.getAllStates();
        this.load();
    }

    load() {
        this.sandbox.fetchAllStates();
    }

    handleChange($event) {
        this.selected.emit($event);
    }

}
