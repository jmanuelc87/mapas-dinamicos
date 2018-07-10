import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../../models/ddr';
import { DistrictSandbox } from './ddr.sandbox';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'app-select-district',
    templateUrl: './ddr.component.html',
    styleUrls: ['./ddr.component.scss'],
    providers: [DistrictSandbox],
})
export class DdrComponent implements OnInit {

    @ViewChild(NgSelectComponent)
    private select: NgSelectComponent;

    private data$: Observable<District[]>

    public selected: EventEmitter<District[]> = new EventEmitter();

    constructor(
        private ddrSandbox: DistrictSandbox,
    ) { }

    ngOnInit() {
        this.data$ = this.ddrSandbox.getDistricts();
    }

    loadDistrictsByState(id: number) {
        this.ddrSandbox.searchDistrictsByState(id);
    }

    selectItem(value: any) {
        let item = this.select.itemsList.findItem(value);
        if (item) {
            this.select.select(item);
        }
    }

    handleChange($event) {
        this.selected.emit($event);
    }

}
