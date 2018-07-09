import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'app-select-years',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {

    @ViewChild(NgSelectComponent)
    private ngSelectComponent: NgSelectComponent;

    constructor() { }

    ngOnInit() {
    }

}
