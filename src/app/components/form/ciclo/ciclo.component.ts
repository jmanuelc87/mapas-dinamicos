import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from "uuid";
import { FormGroup } from '@angular/forms';
import { Ciclo } from '../../../models/ciclo';



@Component({
    selector: 'app-ciclo',
    templateUrl: './ciclo.component.html',
    styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

    @Input()
    id;

    @Input()
    group: FormGroup;

    @Input()
    name: string;


    @Output()
    change: EventEmitter<Ciclo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.id = uuid();
    }


    onChange($event) {
        this.change.emit(new Ciclo());
    }

}
