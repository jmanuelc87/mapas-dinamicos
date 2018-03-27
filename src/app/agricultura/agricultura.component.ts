import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-agricultura',
    templateUrl: './agricultura.component.html',
    styleUrls: ['./agricultura.component.css']
})
export class AgriculturaComponent extends DialogComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }

}
