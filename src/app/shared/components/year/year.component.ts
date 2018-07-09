import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { YearSandbox } from './year.sandbox';
import { Year } from '../../models/year';

@Component({
    selector: 'app-select-years',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    providers: [YearSandbox],
})
export class YearComponent implements OnInit {

    @ViewChild(NgSelectComponent)
    private ngSelectComponent: NgSelectComponent;

    private years$: Year[];

    constructor(
        private sandbox: YearSandbox,
    ) { }

    ngOnInit() {
        this.sandbox.searchAllYears('hello');
        setTimeout(() => {
            this.sandbox.getAllYears().subscribe(response => {
                console.log('loading years...');
                console.log(response);
                this.years$ = response
            });
        }, 1000);
    }

}
