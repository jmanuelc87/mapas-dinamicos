import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { v4 as uuid } from "uuid";

@Component({
    selector: 'app-filtro-estado',
    templateUrl: './filtro-estado.component.html',
    styleUrls: ['./filtro-estado.component.css']
})
export class FiltroEstadoComponent implements OnInit {

    id: any;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Input()
    show: boolean;

    @Output()
    selected: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.id = uuid();
    }

    onHandleClick($event) {
        this.selected.emit($event.target.value);
    }

}
