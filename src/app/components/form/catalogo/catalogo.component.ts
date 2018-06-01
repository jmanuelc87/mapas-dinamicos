import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { v4 as uuid } from "uuid";

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html',
    styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

    id: any;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Output()
    selected: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.id = uuid();
    }

    onClickEvent(event) {
        this.selected.emit(event.target.value);
    }

}
