import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { StateSandbox } from './state.sandbox';
import { Observable } from 'rxjs';
import { State } from '../../models/states';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'app-select-states',
    templateUrl: './states.component.html',
    styleUrls: ['./states.component.scss'],
    providers: [StateSandbox],
})
export class StatesComponent implements OnInit {

    @ViewChild(NgSelectComponent)
    private select: NgSelectComponent;


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

    selectItem(value: any) {
        let item = this.select.itemsList.findItem(value);
        if (item) {
            this.select.select(item);
        }
    }

    getSelectedItem(): any {
        if (this.select.selectedItems.length > 0) {
            return this.select.selectedItems[0].value;
        }
    }

    handleChange($event) {
        this.selected.emit($event);
    }

}
