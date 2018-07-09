import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { YearSandbox } from './year.sandbox';
import { Year } from '../../models/year';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-select-years',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    providers: [YearSandbox],
})
export class YearComponent implements OnInit {

    @ViewChild(NgSelectComponent)
    private ngSelectComponent: NgSelectComponent;

    private years$: Observable<Year[]>;

    constructor(
        private sandbox: YearSandbox,
    ) { }

    ngOnInit() {
        this.sandbox.searchAllYears('hello');
        this.loadYears();
    }

    loadYears() {
        this.years$ = this.sandbox.getAllYears();
    }

}
